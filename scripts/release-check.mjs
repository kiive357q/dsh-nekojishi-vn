import {readFile,readdir,stat,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
export async function publicFiles(){
 const files=[];
 for(const dir of ['src','lib','scripts','tests','demo-assets','docs','.github']){
  async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){if(entry.name==='__pycache__')continue;const child=join(path,entry.name);if(entry.isDirectory())await walk(child);else if(entry.isFile())files.push(child.replaceAll('\\','/'));}}
  await walk(dir);
 }
 for(const role of ['tig','lpd','lpdcat'])files.push(`skills/nekojishi-${role}/SKILL.md`);
 files.push('package.json','package-lock.json','cordis.patch.yml','install.ps1','.gitignore','.gitattributes','README.md','README.zh-TW.md','README.ja.md','LICENSE','THIRD_PARTY_NOTICES.md','HANDOFF.md','screenshots.json');
 return files.sort();
}
if(process.argv[1]?.endsWith('release-check.mjs')){
 const pack=JSON.parse(await readFile('src/resource-pack.json','utf8'));
 if(pack.kind!=='demo')throw Error('Public release must use the original demo pack, never imported game resources.');
 const files=await publicFiles();
 for(const file of files){
  if(file.endsWith('dialogue.jsonl')||file.startsWith('assets/')||file.includes('/references/'))throw Error('Game resource in public release: '+file);
  await stat(file);
  if(!/\.(wav|png)$/i.test(file)){
   const content=await readFile(file,'utf8');
   const privatePath=/[A-Za-z]:[\\/](?:Users|steam)[\\/][^\r\n"']+/i;
   if(privatePath.test(content))throw Error('Machine-specific content in '+file);
   const secret=/\b(?:sk-[A-Za-z0-9]{24,}|gh[pousr]_[A-Za-z0-9]{25,})\b/;
   if(secret.test(content))throw Error('Potential secret in '+file);
  }
 }
 const result={kind:pack.kind,files,fileCount:files.length,excluded:['game assets','dialogue corpus','credentials','client profiles','test data','local caches'],checkedAt:new Date().toISOString()};
 await mkdir('.verification',{recursive:true});await writeFile('.verification/public-file-list.json',JSON.stringify(result,null,2));
 console.log(`Public release check passed: ${files.length} files; original demo pack only.`);
}
