import test from 'node:test';
import assert from 'node:assert/strict';
import {apply} from '../src/index.mjs';
test('code-only installation leaves the host operational when game resources are absent',async()=>{
 // Use the actual module copy in a fresh sandbox without an assets directory.
 const {mkdtemp,cp,mkdir,rm}=await import('node:fs/promises');
 const {resolve,join}=await import('node:path');
 const {pathToFileURL}=await import('node:url');
 await mkdir('.verification',{recursive:true});
 const root=await mkdtemp(resolve('.verification/code-only-'));
 await cp('src',join(root,'src'),{recursive:true});await cp('skills',join(root,'skills'),{recursive:true,filter:path=>!path.includes('references')});
 const module=await import(pathToFileURL(join(root,'src/index.mjs')));
 const warnings=[],routes=[];
 const ctx={skills:{register:()=>{}},systemPrompt:{context:()=>{}},webServer:{register:r=>{routes.push(r);return()=>{};}},effect:run=>run(),emit:()=>{},logger:{warn:text=>warnings.push(text)}};
 const previous=process.env.DSH_HOME;process.env.DSH_HOME=join(root,'home');
 try{await module.apply(ctx);assert.equal(warnings.length,1);assert.equal(routes.some(r=>r.path==='/nekojishi-assets'),false);assert.equal(routes.some(r=>r.path==='/nekojishi-ui/persona'),true);}
 finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;}
});
