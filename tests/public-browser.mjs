import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const game=JSON.parse(await readFile('src/resource-pack.json','utf8')).kind==='game';
let url=process.env.DSH_PUBLIC_TEST_URL;
for(let attempt=0;!url&&attempt<120;attempt++){
 const log=await readFile('.cache/codex/public-server.out','utf8').catch(()=>'');url=log.match(/http:\/\/127\.0\.0\.1:\d+\/[^\s]*/)?.[0];
 if(!url)await new Promise(resolve=>setTimeout(resolve,250));
}
if(!url)throw Error('Start an isolated DSH web host and supply its URL in DSH_PUBLIC_TEST_URL.');
const browser=await chromium.launch({executablePath:process.env.DSH_TEST_BROWSER??'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--mute-audio']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[],results=[];
await page.addLocatorHandler(page.getByRole('button',{name:'继续',exact:true}),async button=>{await button.click();});
page.on('pageerror',error=>errors.push(error.message));
await mkdir('.verification',{recursive:true});
async function check(name,run){await run();results.push({name,passed:true});console.log('PASS',name);}
try{
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await page.locator('[data-neko-shell]').waitFor({timeout:45000});
 const next=page.getByRole('button',{name:'继续',exact:true});await next.waitFor({state:'visible',timeout:5000}).catch(()=>{});if(await next.isVisible())await next.click();
 await check('prebuilt theme mounts with the selected resource pack',async()=>{
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-neko-character]')].every(e=>e.complete&&e.naturalWidth>0));
  assert.equal(await page.locator('[data-neko-character]').count(),game?2:0);
  assert.equal(await page.locator('[data-composer-card]').count(),1);
  const response=await page.request.get(new URL('/nekojishi-assets/'+(game?'tig-normal.png':'dialogue.png'),url).href);assert.equal(response.status(),200);assert.match(response.headers()['content-type'],game?/png/:/svg/);
 });
 await page.screenshot({path:'.verification/public-demo.png'});
 await check('resource-aware scenes and character controls',async()=>{
  await page.getByRole('button',{name:'人物与场景',exact:true}).click();
  if(game)await page.getByLabel('背景分类',{exact:true}).selectOption('全部');
  assert.equal(await page.locator('.vn-scene-card').count(),game?107:3);
  await page.getByRole('dialog',{name:'人物与场景',exact:true}).screenshot({path:'.verification/public-appearance.png'});
  const left=page.locator('fieldset').filter({has:page.getByText('左侧人物',{exact:true})});await left.getByRole('button',{name:'无',exact:true}).click();
  await page.getByRole('button',{name:'关闭',exact:true}).click();assert.equal(await page.locator('[data-neko-character]').count(),game?1:0);
  if(game){await page.getByRole('button',{name:'人物与场景',exact:true}).click();await left.getByRole('button',{name:'虎爷',exact:true}).click();await page.getByRole('button',{name:'关闭',exact:true}).click();}
 });
 await check('selected-pack audio has finite duration and Range support',async()=>{
  await page.getByRole('button',{name:'打开对话与账户栏',exact:true}).click();
  await page.waitForFunction(()=>Number.isFinite(document.querySelector('[data-neko-music] audio')?.duration)&&document.querySelector('[data-neko-music] audio').duration>0);
  assert.equal(await page.locator('[data-neko-music] audio').evaluate(e=>e.paused),true);
  await page.getByRole('button',{name:'播放音乐',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-neko-music] audio').currentTime>.1);
  const response=await page.request.get(new URL('/nekojishi-assets/'+(game?'music-Title.mp3':'quiet-loop.wav'),url).href,{headers:{Range:'bytes=0-127'}});assert.equal(response.status(),206);assert.equal((await response.body()).length,128);
  await page.getByRole('button',{name:'暂停音乐',exact:true}).click();
  await page.getByRole('button',{name:'展开歌单',exact:true}).click();await page.screenshot({path:'.verification/public-sidebar-music.png'});
 });
 await check('plugins and schedules hide characters and portrait',async()=>{
  for(const name of ['插件','自动化任务']){await page.getByRole('button',{name,exact:true}).click();await page.waitForTimeout(200);assert.equal(await page.locator('[data-neko-character]').count(),0);assert.equal(await page.locator('.vn-status').count(),0);}
  await page.getByRole('button',{name:'新建会话',exact:true}).last().click();await page.locator('[data-composer-card]').waitFor();
 });
 await check('responsive layouts remain inside five viewport sizes',async()=>{
  for(const [width,height] of [[800,700],[1200,800],[1440,1000],[1920,1080],[3120,2080]]){await page.setViewportSize({width,height});await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
 });
 await check('native editor survives switching the theme off and on',async()=>{
  const editor=page.locator('[data-composer-card] [contenteditable=true]').first();await editor.fill('demo-only unsent draft');const handle=await editor.elementHandle();
  await page.getByRole('button',{name:'切回原界面',exact:true}).click();assert.equal(await handle.evaluate(e=>e.isConnected),true);
  await page.getByRole('button',{name:'启用家有大猫界面',exact:true}).click();assert.equal(await editor.innerText(),'demo-only unsent draft');
 });
 assert.deepEqual(errors,[]);console.log('PASS no browser runtime errors');
}catch(error){console.error(error.message);results.push({passed:false,error:error.message});await page.screenshot({path:'.verification/public-failure.png'});await writeFile('.verification/public-failure.txt',await page.locator('body').innerText());process.exitCode=1;}
finally{await writeFile('.verification/'+(game?'game-browser':'public-browser')+'.json',JSON.stringify({pack:game?'local-game':'public-demo',results,errors},null,2));await browser.close();}
