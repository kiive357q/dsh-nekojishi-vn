import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {roleForSelection,CHARACTERS} from './state.mjs';
export async function installPersona(ctx){
 const root=fileURLToPath(new URL('../skills/',import.meta.url));const definitions=new Map();
 for(const role of ['tig','lpd','lpdcat']){
   const folder=join(root,'nekojishi-'+role);const path=join(folder,'SKILL.md');const raw=await readFile(path,'utf8');
   const content=raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').trim();
   const description=raw.match(/^description:\s*(.+)$/m)?.[1]??CHARACTERS[role].name;
   definitions.set(role,{content,folder});
   ctx.skills.register({name:'nekojishi-'+role,description,content,path,source:'bundled',resourceBase:{kind:'directory',path:folder}});
 }
 const stateDirectory=join(process.env.DSH_HOME??fileURLToPath(new URL('../.local-state/',import.meta.url)),'customizations','nekojishi');
 const stateFile=join(stateDirectory,'role-bindings.json');let bindings={},defaultRole=null;
 try{const saved=JSON.parse(await readFile(stateFile,'utf8'));defaultRole=definitions.has(saved.defaultRole)?saved.defaultRole:null;for(const [id,role] of Object.entries(saved.bindings??saved))if(/^[\w-]{1,160}$/.test(id)&&(role===null||definitions.has(role)))bindings[id]=role;}catch(error){if(error.code!=='ENOENT')ctx.logger.warn('Nekojishi role bindings could not be read');}
 let pending=Promise.resolve();
 const save=()=>{const data=JSON.stringify({defaultRole,bindings},null,2);pending=pending.catch(()=>{}).then(async()=>{await mkdir(stateDirectory,{recursive:true});await writeFile(stateFile+'.tmp',data);await rename(stateFile+'.tmp',stateFile);});return pending;};
 ctx.systemPrompt.context({name:'nekojishi:character-expression',order:850,required:true,interpolate:false,text:context=>{
   const id=context.agent?.id??context.scope?.id;const role=Object.hasOwn(bindings,id)?bindings[id]:defaultRole;const skill=definitions.get(role);
   return skill?`<nekojishi-character-expression skill="nekojishi-${role}">\n${skill.content}\n技能资源目录：${skill.folder}\n</nekojishi-character-expression>`:Object.hasOwn(bindings,id)?'<nekojishi-character-expression active="false">当前已关闭人物表达。历史角色台词仅作对话记录，本次任务使用原生 Agent 的专业表达，继续原任务与工具权限。</nekojishi-character-expression>':'';
 }});
 ctx.effect(()=>ctx.webServer.register({kind:'exact',path:'/nekojishi-ui/persona',handler:async(req,res)=>{
   const send=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
   if(req.method!=='POST'){send(405,{error:'POST required'});return;}
   let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>4096){send(413,{error:'Request too large'});return;}chunks.push(chunk);}
   let body;try{body=JSON.parse(Buffer.concat(chunks));}catch{send(400,{error:'Invalid JSON'});return;}
   const {sessionId,left,right,enabled}=body;
   if(sessionId!==null&&(typeof sessionId!=='string'||!/^[\w-]{1,160}$/.test(sessionId))||!Object.hasOwn(CHARACTERS,left)||!Object.hasOwn(CHARACTERS,right)||typeof enabled!=='boolean'){send(400,{error:'Invalid character selection'});return;}
   const role=roleForSelection(left,right,enabled);const previous=sessionId===null?defaultRole:bindings[sessionId]??null;const defaultChanged=defaultRole!==role;defaultRole=role;if(sessionId!==null)bindings[sessionId]=role;
   if(previous!==role||defaultChanged){await save();ctx.emit('system-prompt/change');}
   send(200,{role,skill:role?'nekojishi-'+role:null});
 }}),'nekojishi: session character binding');
}
