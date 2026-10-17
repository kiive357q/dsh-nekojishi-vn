import scenes from './scenes.json' with {type:'json'};
import contours from './contours.json' with {type:'json'};
import resourcePack from './resource-pack.json' with {type:'json'};
export const SCENES=Object.freeze(scenes);
const sceneMap=new Map(SCENES.map(scene=>[scene.id,scene]));
export const sceneFor=id=>sceneMap.get(id)??sceneMap.get('night');
export const DEFAULTS=Object.freeze({enabled:true,left:resourcePack.kind==='game'?'tig':'none',right:resourcePack.kind==='game'?'lpdcat':'none',scene:'night',motion:true,showPortrait:true,textShadow:true,persona:resourcePack.kind==='game'});
export const CHARACTERS=Object.freeze({none:{name:'无',normal:null},tig:{name:'虎爷',normal:'tig-normal.png',happy:'tig-happy.png',concern:'tig-concern.png'},lpd:{name:'云豹',normal:'lpd-normal.png',happy:'lpd-happy.png',concern:'lpd-concern.png'},lpdcat:{name:'石虎',normal:'lpdcat-normal.png',happy:'lpdcat-happy.png',concern:'lpdcat-concern.png'}});
export const MOODS=Object.freeze({idle:{label:'正在倾听',expression:'normal',portrait:'normal'},thinking:{label:'正在思考',expression:'normal',portrait:'serious'},working:{label:'正在执行',expression:'normal',portrait:'serious'},speaking:{label:'正在回复',expression:'happy',portrait:'normal'},waiting:{label:'等待你的回答',expression:'concern',portrait:'confused'},approval:{label:'等待你的确认',expression:'concern',portrait:'serious'},finished:{label:'本轮已完成',expression:'happy',portrait:'laugh'},goal:{label:'目标已完成',expression:'happy',portrait:'laugh'},failed:{label:'遇到问题',expression:'concern',portrait:'difficult'},stopped:{label:'已停止',expression:'normal',portrait:'difficult'},offline:{label:'连接中断',expression:'concern',portrait:'confused'}});
export function normalizePreferences(value){
  const p={...DEFAULTS};if(!value||typeof value!=='object')return p;
  for(const k of ['enabled','motion','showPortrait','textShadow','persona'])if(typeof value[k]==='boolean')p[k]=value[k];
  for(const k of ['left','right'])if(Object.hasOwn(CHARACTERS,value[k]))p[k]=value[k];
  if(sceneMap.has(value.scene))p.scene=value.scene;
  if(resourcePack.kind!=='game'){p.left='none';p.right='none';p.persona=false;}
  return p;
}
/** Only structural events determine state. Tokens and natural-language wording do not. */
export function moodFromFacts({pending,goalPhase,running,openError,lastError,lastEvent,latestTurnEnd}){
  if(pending)return pending.kind==='approval'?'approval':'waiting';
  if(openError)return 'offline';
  if(running){
    const type=lastEvent?.type??'';
    if(type==='assistant/live-chunk'){
      const chunk=lastEvent.data?.chunk;const kind=chunk?.type??'';
      if(/tool/.test(kind))return 'working';
      if(/reason|think/.test(kind))return 'thinking';
      if(/text|content/.test(kind))return 'speaking';
    }
    if(type.startsWith('tool/')||type.includes('tool-call'))return 'working';
    if(type==='assistant/message'||type==='assistant/chunk'||type==='assistant/text'||type.includes('delta'))return 'speaking';
    return 'thinking';
  }
  const reason=latestTurnEnd?.data?.reason;const kind=typeof reason==='string'?reason:reason?.kind;
  if(kind==='error'||lastError)return 'failed';
  if(['interrupted','cancelled','canceled','stopped','abort','aborted'].includes(kind))return 'stopped';
  if(kind==='blocked'||kind==='max-tokens'||goalPhase==='blocked')return 'stopped';
  if(goalPhase==='complete')return 'goal';
  if(latestTurnEnd)return 'finished';
  return 'idle';
}
export function roleForSelection(left,right,enabled=true){
  if(!enabled)return null;
  const roles=[...new Set([left,right].filter(role=>role!=='none'&&Object.hasOwn(CHARACTERS,role)))];
  return roles.length===1?roles[0]:null;
}
function alphaEdges(profile,top,height,from,to){
  if(!profile||to<top||from>top+height||height<=0)return null;
  const first=Math.max(0,Math.floor((from-top)/height*profile.rows.length));
  const last=Math.min(profile.rows.length-1,Math.ceil((to-top)/height*profile.rows.length));
  let left=1,right=0;
  for(let i=first;i<=last;i++){const row=profile.rows[i];if(row){left=Math.min(left,row[0]);right=Math.max(right,row[1]);}}
  return right>left?[left,right]:null;
}
export function geometry(width,composer={},selection={}){
  const composerWidth=composer.width??Math.min(1480,Math.max(0,width-80));
  const left=composer.left??(width-composerWidth)/2;
  const top=composer.top??640;
  const height=selection.height??top+175;const expression=selection.expression??'normal';
  const l=contours[CHARACTERS[selection.left??'tig']?.[expression]],r=contours[CHARACTERS[selection.right??'lpdcat']?.[expression]];
  const avatar=selection.showPortrait!==false&&(l||r);const avatarWidth=selection.portraitWidth??150;
  const minimum=Math.min(320,Math.max(280,width*.27));
  let character=(l||r)?Math.max(0,height-92):0,result;
  for(let attempt=0;attempt<100;attempt++){
    if(character<60)character=0;
    const bodyTop=height-character;
    const lWidth=character*(l?.ratio??0),rWidth=character*(r?.ratio??0);
    let lx=Math.max(0,left-28),rx=width-Math.max(24,width-left-composerWidth)-rWidth-12;
    const avatarEdge=avatar?alphaEdges(l,bodyTop,character,top-100,top-28):null;
    if(avatarEdge)lx=Math.max(lx,left+avatarWidth+12-avatarEdge[0]*lWidth);
    const le=alphaEdges(l,bodyTop,character,80,top),re=alphaEdges(r,bodyTop,character,80,top);
    const margin=Math.min(24,Math.max(0,(width-280)/2));
    const safeLeft=le?Math.max(margin,lx+le[1]*lWidth+20):margin;
    const safeRight=re?Math.max(margin,width-(rx+re[0]*rWidth)+20):margin;
    result={safeLeft,safeRight,leftX:lx,rightX:rx,flowWidth:Math.min(920,Math.max(0,width-safeLeft-safeRight)),flowOffset:(safeLeft-safeRight)/2};
    if(width-safeLeft-safeRight>=minimum||character<30||!l&&!r)break;
    character*=.96;
  }
  return {...result,safe:Math.max(0,(width-result.flowWidth)/2),character,compact:width<620,composerLeft:left,composerRight:Math.max(0,width-left-composerWidth),composerTop:top};
}
