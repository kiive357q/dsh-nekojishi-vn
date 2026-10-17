/** Original code-generated demo graphics/audio; no game files are read. */
import {mkdir,writeFile,readFile} from 'node:fs/promises';
if(!process.argv.includes('--force')){
 try{const pack=JSON.parse(await readFile('src/resource-pack.json','utf8'));if(pack.kind==='game'){await readFile('assets/manifest.json');process.exit(0);}}catch{}
}
await mkdir('demo-assets',{recursive:true});
const aliases={};
const svg=(width,height,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
async function asset(name,body){const file=name.replace(/\.(png|jpg)$/i,'.svg');aliases[name]=file;await writeFile('demo-assets/'+file,body);}
for(const [id,sky,light] of [['night','#101d38','#8ecde5'],['day','#728f96','#ffe7b4'],['forest','#183d3d','#b9dfbc']]){
 await asset(`room-${id}.png`,svg(1600,1000,`<defs><linearGradient id="s" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="#111a28"/></linearGradient><radialGradient id="g"><stop stop-color="${light}" stop-opacity=".24"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient></defs><path fill="url(#s)" d="M0 0h1600v1000H0z"/><circle fill="url(#g)" cx="850" cy="270" r="650"/><path fill="#0d1827" opacity=".6" d="M0 740 190 650 420 760 680 620 940 760 1270 650 1600 720v280H0z"/><g stroke="${light}" stroke-opacity=".14" fill="none"><path d="M80 80h1440v840H80zM110 110h1380v780H110z"/><path d="M0 810h1600M0 870h1600"/></g><circle cx="1270" cy="175" r="55" fill="${light}" opacity=".4"/>`));
}
const frame=svg(240,160,'<rect x="4" y="4" width="232" height="152" rx="14" fill="#101b2b" fill-opacity=".94" stroke="#b5d8dc" stroke-opacity=".7" stroke-width="3"/>');
for(const name of ['dialogue','choice','choice-hover','save-card','save-card-active','portrait-frame'])await asset(name+'.png',frame);
const paths={clock:'M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22m0 5v7l5 3',gear:'m16 4 3 5 6 1-1 6 3 5-5 4-6-1-6 1-5-4 3-5-1-6 6-1z',paper:'M8 3h12l5 5v21H8zM12 13h9m-9 5h9m-9 5h6',hide:'m3 16 8-8h10l8 8-8 8H11zM5 28 27 4',auto_forward:'m5 7 12 9L5 25zm13 0 12 9-12 9z',speedup:'m4 7 12 9L4 25zm12 0 12 9-12 9z',paw:'M10 23q6-12 12 0v4H10zM7 13h1m6-5h1m7 0h1m4 6h1',home:'m3 16 13-12 13 12M8 13v16h16V13'};
for(const [name,path] of Object.entries(paths))for(const suffix of ['a','b'])await asset(`icon-${name}-${suffix}.png`,svg(32,32,`<path d="${path}" stroke="${suffix==='a'?'#e6eeee':'#ffd28d'}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`));
await asset('logo.png',svg(700,150,'<text x="350" y="85" text-anchor="middle" fill="#e5eff0" font-family="Georgia,serif" font-size="64" letter-spacing="8">AGENT NOVEL</text><path d="M115 120h470" stroke="#e5eff0" opacity=".5"/>'));
// A small original ambient pattern, synthesized directly from frequencies.
const rate=16000,seconds=16,pcm=Buffer.alloc(rate*seconds*2),notes=[220,261.6256,329.6276,293.6648,246.9417,329.6276,391.9954,293.6648];
for(let i=0;i<rate*seconds;i++){const t=i/rate,phase=t%2,freq=notes[Math.floor(t/2)],env=Math.min(1,phase*4)*Math.exp(-phase*1.8);const sample=(Math.sin(2*Math.PI*freq*t)+.25*Math.sin(2*Math.PI*freq*2*t))*.12*env;pcm.writeInt16LE(Math.round(sample*32767),i*2);}
const header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*2,28);header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
await writeFile('demo-assets/quiet-loop.wav',Buffer.concat([header,pcm]));aliases['quiet-loop.wav']='quiet-loop.wav';
await writeFile('demo-assets/manifest.json',JSON.stringify({kind:'demo',origin:'Original code-generated demo resources; MIT',files:[...Object.keys(aliases),'manifest.json'],aliases},null,2));
await writeFile('src/resource-pack.json',JSON.stringify({kind:'demo'},null,2));
await writeFile('src/scenes.json',JSON.stringify([['day','晨光'],['night','星夜'],['forest','林间']].map(([id,label])=>({id,file:`room-${id}.png`,label:'原创演示 · '+label,source:`demo/${id}`,group:'场景'})),null,2));
const contours={};for(const role of ['tig','lpd','lpdcat'])for(const expression of ['normal','happy','concern'])contours[`${role}-${expression}.png`]={width:400,height:900,ratio:400/900,rows:Array.from({length:128},()=>[.05,.95])};
await writeFile('src/contours.json',JSON.stringify(contours));
await writeFile('src/music.json',JSON.stringify([{id:'demo-quiet',title:'Quiet Loop · 原创演示',file:'quiet-loop.wav',source:'demo/quiet-loop.wav',credit:'原创合成演示'}],null,2));
console.log('Generated original demo pack: three original scenes, one synthesized loop; characters require local game import.');
