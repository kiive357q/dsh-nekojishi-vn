import test from 'node:test';
import assert from 'node:assert/strict';
import {SCENES,sceneFor,moodFromFacts,normalizePreferences,geometry,roleForSelection} from '../src/state.mjs';
import {parsePlaylist} from '../src/music-state.mjs';
import resourcePack from '../src/resource-pack.json' with {type:'json'};
test('an unfinished tool or streamed reply never signals task completion',()=>{
  assert.equal(moodFromFacts({running:true,lastEvent:{type:'tool/start'}}),'working');
  assert.equal(moodFromFacts({running:true,lastEvent:{type:'assistant/delta'}}),'speaking');
  assert.equal(moodFromFacts({running:true,latestTurnEnd:{data:{reason:{kind:'completed'}}}}),'thinking');
  assert.equal(moodFromFacts({running:true,lastEvent:{type:'assistant/live-chunk',data:{chunk:{type:'text-delta'}}}}),'speaking');
  assert.equal(moodFromFacts({running:true,lastEvent:{type:'assistant/live-chunk',data:{chunk:{type:'reasoning-delta'}}}}),'thinking');
  assert.equal(moodFromFacts({running:true,lastEvent:{type:'assistant/live-chunk',data:{chunk:{type:'tool-call-delta'}}}}),'working');
});
test('question and permission interactions take precedence over running',()=>{
  assert.equal(moodFromFacts({running:true,pending:{kind:'question'}}),'waiting');
  assert.equal(moodFromFacts({running:true,pending:{kind:'approval'}}),'approval');
});
test('end, failure, stop and disconnect remain distinct',()=>{
  assert.equal(moodFromFacts({latestTurnEnd:{data:{reason:{kind:'completed'}}}}),'finished');
  assert.equal(moodFromFacts({latestTurnEnd:{data:{reason:{kind:'error'}}}}),'failed');
  assert.equal(moodFromFacts({latestTurnEnd:{data:{reason:{kind:'interrupted'}}}}),'stopped');
  assert.equal(moodFromFacts({openError:{message:'offline'}}),'offline');
  assert.equal(moodFromFacts({latestTurnEnd:{data:{reason:{kind:'max-tokens'}}}}),'stopped');
  assert.equal(moodFromFacts({goalPhase:'complete'}),'goal');
  assert.equal(moodFromFacts({running:true,goalPhase:'complete'}),'thinking');
});
test('stored UI preferences cannot alter model settings or add unknown fields',()=>{
  const p=normalizePreferences({left:'unknown',right:'lpd',scene:'day',enabled:false,model:'unwanted'});
  assert.equal(p.left,resourcePack.kind==='game'?'tig':'none');assert.equal(p.right,resourcePack.kind==='game'?'lpd':'none');assert.equal(p.scene,'day');assert.equal(p.enabled,false);assert.ok(!('model' in p));
});
test('narrow stage geometry always leaves a readable center',()=>{
  for(const width of [320,480,600,800,1200,1600])assert.ok(width-geometry(width).safe*2>=280);
});
test('game background preferences preserve old choices and reject arbitrary asset paths',()=>{
  assert.equal(normalizePreferences({scene:'day'}).scene,'day');
  const forest=SCENES.find(scene=>scene.source==='bg/018_Forest_d.png')??SCENES.at(-1);
  assert.equal(normalizePreferences({scene:forest.id}).scene,forest.id);
  assert.equal(sceneFor(forest.id).file,forest.file);
  assert.equal(normalizePreferences({scene:'../../private-file'}).scene,'night');
  assert.equal(new Set(SCENES.map(scene=>scene.id)).size,SCENES.length);
});
test('one character or matching characters choose one role; absent and different characters do not',()=>{
 assert.equal(roleForSelection('tig','none'),'tig');assert.equal(roleForSelection('none','lpd'),'lpd');assert.equal(roleForSelection('tig','tig'),'tig');assert.equal(roleForSelection('tig','lpd'),null);assert.equal(roleForSelection('none','none'),null);assert.equal(roleForSelection('tig','tig',false),null);
 const absent=geometry(1400,{}, {left:'none',right:'none'});const left=geometry(1400,{}, {left:'tig',right:'none'});const right=geometry(1400,{}, {left:'none',right:'tig'});
 assert.equal(absent.character,0);assert.ok(left.flowOffset>0);assert.ok(right.flowOffset<0);assert.ok(left.flowWidth>=280&&right.flowWidth>=280);
});
test('playlist import resolves selected local songs without turning paths into filesystem access',()=>{
 const tracks=[{id:'a',name:'曲目.wav',title:'曲目'}];
 assert.deepEqual(parsePlaylist('#EXTM3U\n./音乐/曲目.wav\nmissing.mp3','列表.m3u',tracks).trackIds,['a']);
 assert.deepEqual(parsePlaylist('#EXTM3U\n./音乐/曲目.wav\nmissing.mp3','列表.m3u',tracks).missing,['missing.mp3']);
 assert.deepEqual(parsePlaylist('{"name":"自选","tracks":["曲目.wav"]}','list.json',tracks).trackIds,['a']);
 assert.throws(()=>parsePlaylist('{"name":"bad"}','list.json',tracks));
});
