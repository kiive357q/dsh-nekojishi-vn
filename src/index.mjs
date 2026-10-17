import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import {installPersona} from './host-persona.mjs';
import pack from './resource-pack.json' with {type:'json'};

export const inject = ['webServer','skills','systemPrompt'];
/** Serve only the package-owned manifest entries; no arbitrary filesystem paths. */
export async function apply(ctx) {
  await installPersona(ctx);
  const root=fileURLToPath(new URL(pack.kind==='game'?'../assets/':'../demo-assets/',import.meta.url));
  let manifest;
  try{manifest=JSON.parse(await readFile(join(root,'manifest.json'),'utf8'));}
  catch(error){if(error.code!=='ENOENT')throw error;ctx.logger.warn('Nekojishi resources are not imported. Native UI remains available; follow the repository local-import instructions.');return;}
  const whitelist=new Set(manifest.files);
  ctx.effect(()=>ctx.webServer.register({kind:'prefix',path:'/nekojishi-assets',handler:async(req,res)=>{
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
    let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname.slice('/nekojishi-assets/'.length));}catch{res.writeHead(400);res.end();return;}
    if(!whitelist.has(name)){res.writeHead(404);res.end();return;}
    const actual=manifest.aliases?.[name]??name;if(actual.includes('/')||actual.includes('\\')||actual==='..'){res.writeHead(404);res.end();return;}
    const file=join(root,actual);let info;try{info=await stat(file);}catch{res.writeHead(404);res.end();return;}const etag=`"${info.size}-${Math.floor(info.mtimeMs)}"`;
    if(req.headers['if-none-match']===etag){res.writeHead(304);res.end();return;}
    const type=actual.endsWith('.svg')?'image/svg+xml':actual.endsWith('.wav')?'audio/wav':actual.endsWith('.png')?'image/png':actual.endsWith('.jpg')?'image/jpeg':actual.endsWith('.mp3')?'audio/mpeg':'application/json; charset=utf-8';
    let start=0,end=info.size-1,status=200;
    if(req.headers.range){const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(match){start=match[1]?Number(match[1]):Math.max(0,info.size-Number(match[2]));end=match[1]&&match[2]?Math.min(end,Number(match[2])):end;status=206;}else start=info.size;
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}}
    res.writeHead(status,{'Content-Type':type,'Content-Length':end-start+1,'Accept-Ranges':'bytes',...(status===206?{'Content-Range':`bytes ${start}-${end}/${info.size}`}:{ }),'Cache-Control':'private, max-age=86400','ETag':etag,'X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD'){res.end();return;}
    const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
  }}),'nekojishi: assets');
}
