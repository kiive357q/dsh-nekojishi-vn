import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {mkdir,mkdtemp} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {installPersona} from '../src/host-persona.mjs';
test('native persona provider scopes bindings, supplies new-chat defaults, and explicitly disables old personas',async()=>{
 const root=resolve('.verification');await mkdir(root,{recursive:true});const home=await mkdtemp(join(root,'persona-test-'));const previous=process.env.DSH_HOME;process.env.DSH_HOME=home;
 try{
  let route,context;const skills=[];const ctx={skills:{register:skill=>{skills.push(skill);return()=>{};}},systemPrompt:{context:entry=>{context=entry;}},webServer:{register:value=>{route=value;return()=>{};}},effect:run=>run(),emit:()=>{},logger:{warn:()=>{}}};
  await installPersona(ctx);assert.equal(skills.length,3);assert.equal(context.required,true);assert.equal(context.complete,undefined);
  const send=async body=>{let status,reply;const request=Readable.from([Buffer.from(JSON.stringify(body))]);request.method='POST';await route.handler(request,{writeHead:code=>{status=code;},end:value=>{reply=JSON.parse(value);}});return {status,reply};};
  assert.equal((await send({sessionId:null,left:'tig',right:'none',enabled:true})).status,200);
  assert.ok(context.text({agent:{id:'new-chat'}}).includes('skill="nekojishi-tig"'));
  await send({sessionId:'old-chat',left:'lpd',right:'none',enabled:true});
  assert.ok(context.text({agent:{id:'old-chat'}}).includes('skill="nekojishi-lpd"'));assert.ok(context.text({agent:{id:'next-new-chat'}}).includes('skill="nekojishi-lpd"'));
  await send({sessionId:'old-chat',left:'none',right:'none',enabled:true});assert.ok(context.text({agent:{id:'old-chat'}}).includes('active="false"'));assert.equal(context.text({agent:{id:'next-new-chat'}}),'');
  assert.equal((await send({sessionId:'../../outside',left:'tig',right:'tig',enabled:true})).status,400);
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;}
});
