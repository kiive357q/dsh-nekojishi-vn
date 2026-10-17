import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {DEFAULTS,CHARACTERS,MOODS,SCENES,sceneFor,normalizePreferences,moodFromFacts,geometry,roleForSelection} from './state.mjs';
import {MusicPlayer} from './music.jsx';
import resourcePack from './resource-pack.json';
const gameResources=resourcePack.kind==='game';
const ID='dsh-nekojishi-vn';
const asset=name=>`/nekojishi-assets/${encodeURIComponent(name)}`;
const currentSession=list=>Object.values(list.byId??{}).find(item=>(item.retainedBy?.mainView??0)>0)?.id;
export const inject=['slots','layout','theme','sessions','uiSession','sidebarRight','uiWorkspace'];

function makeUI(){
  let saved;try{saved=JSON.parse(localStorage.getItem('dsh.nekojishi.preferences.v1')??'null');}catch{saved=null;}
  let snapshot={preferences:normalizePreferences(saved),panel:null,notice:''};const listeners=new Set();
  const update=value=>{snapshot={...snapshot,...value};for(const listener of listeners)listener();};
  return {getSnapshot:()=>snapshot,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},
    panel:panel=>update({panel,notice:''}),notice:notice=>update({notice}),
    preferences:patch=>{const preferences=normalizePreferences({...snapshot.preferences,...patch});try{localStorage.setItem('dsh.nekojishi.preferences.v1',JSON.stringify(preferences));}catch(error){console.warn('Nekojishi preferences could not be saved',error);}update({preferences});}};
}
/** Incremental event consumption: never walk the complete transcript per token. */
function makeMood(ctx){
  let snapshot={id:undefined,mood:'idle'},binding,offBinding=[],lastEvent,latestTurnEnd,lastRevision;
  const listeners=new Set();
  const publish=()=>{
    const id=currentSession(ctx.sessions.list.getSnapshot());const nextBinding=id===undefined?undefined:ctx.sessions.binding(id);
    if(nextBinding!==binding){for(const off of offBinding)off();offBinding=[];binding=nextBinding;lastEvent=undefined;latestTurnEnd=undefined;lastRevision=undefined;
      if(binding){offBinding=[binding.session.subscribe(publish),binding.eventSource.subscribe(publish),binding.session.projections.faceOf('goal').subscribe(publish)];}
    }
    const lifecycle=binding?.session.getSnapshot();const events=binding?.eventSource.getSnapshot();
    if(events&&events.revision!==lastRevision){
      const change=events.change;
      const entries=lastRevision===undefined||change?.kind==='replace'?events.entries:change?.kind==='append'?change.entries:change?.kind==='settle-assistant'&&change.entry?[change.entry]:[];
      for(const entry of entries??[]){const event=entry.event??entry;lastEvent=event;if(event.type==='turn/end')latestTurnEnd=event;}
      lastRevision=events.revision;
    }
    const pending=id===undefined?undefined:ctx.uiSession.sessionStatus.getSnapshot().get(id)?.pendingInteraction;
    const goalPhase=binding?.session.projections.faceOf('goal').getSnapshot()?.goal?.phase;
    const mood=moodFromFacts({pending,goalPhase,running:lifecycle?.running,openError:lifecycle?.openError,lastError:lifecycle?.lastAgentError,lastEvent,latestTurnEnd});
    if(snapshot.id!==id||snapshot.mood!==mood){snapshot={id,mood};for(const listener of listeners)listener();}
  };
  const off=[ctx.sessions.list.subscribe(publish),ctx.uiSession.sessionStatus.subscribe(publish)];publish();
  return {getSnapshot:()=>snapshot,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},dispose:()=>{off.forEach(fn=>fn());offBinding.forEach(fn=>fn());listeners.clear();}};
}

function GameButton({icon,label,onClick,disabled=false,...props}){
  return <button type="button" className="vn-game-button" aria-label={label} title={label} onClick={onClick} disabled={disabled} {...props}><img src={asset(`icon-${icon}-a.png`)} alt=""/><span className="vn-sr">{label}</span></button>;
}

function Appearance({preferences,onChange}){
  const [search,setSearch]=useState('');const [group,setGroup]=useState('场景');
  const scenes=SCENES.filter(scene=>(group==='全部'||scene.group===group)&&`${scene.label} ${scene.source}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="vn-appearance">
    <p className="vn-explanation">人物与模型独立选择。启用角色表达后，单角色或同角色会加载对应 skill；模型、任务工具与原生工作流程保持不变。</p>
    {!gameResources&&<p className="vn-explanation">当前为轻量舞台。人物使用你本机的游戏资源，按 README 导入并构建后即可选择原版角色。</p>}<div className="vn-character-selects">{[['left','左侧人物'],['right','右侧人物']].map(([side,label])=><fieldset key={side}><legend>{label}</legend><div className="vn-character-cards">{Object.entries(CHARACTERS).filter(([key])=>gameResources||key==='none').map(([key,character])=><button type="button" className="vn-character-card" aria-pressed={preferences[side]===key} key={key} onClick={()=>onChange({[side]:key})}>{character.normal?<img src={asset(character.normal)} alt=""/>:<span className="vn-none-character" aria-hidden="true">∅</span>}<strong>{character.name}</strong></button>)}</div></fieldset>)}</div>
    <fieldset><legend>角色表达</legend><label className="vn-check"><input type="checkbox" disabled={!gameResources} checked={preferences.persona} onChange={event=>onChange({persona:event.target.checked})}/>单角色或两侧同角色时，启用对应人物 skill</label><p className="vn-explanation">只改变表达方式，模型和任务工具保持原样。正在执行的任务结束后再更新角色表达。</p></fieldset>
    <fieldset><legend>游戏场景</legend><div className="vn-scene-toolbar"><input type="search" aria-label="搜索游戏场景" placeholder="搜索场景名称或原文件名" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="背景分类" value={group} onChange={e=>setGroup(e.target.value)}><option>场景</option><option>其他背景</option><option>全部</option></select></div><p className="vn-explanation">当前：{sceneFor(preferences.scene).label}。共 {SCENES.length} 张游戏背景，显示 {scenes.length} 张。</p><div className="vn-scene-grid">{scenes.map(scene=><button type="button" key={scene.id} className="vn-scene-card" aria-pressed={preferences.scene===scene.id} aria-label={scene.label+' '+scene.source} onClick={()=>onChange({scene:scene.id})}><img src={asset(scene.file)} alt="" loading="lazy" decoding="async"/><strong>{scene.label}</strong><small>{scene.source.slice(3)}</small></button>)}</div>{!scenes.length&&<p className="vn-explanation">没有匹配的背景，可尝试切换分类。</p>}</fieldset>
    <fieldset><legend>动作与阅读</legend>
    <label className="vn-check"><input type="checkbox" checked={preferences.motion} onChange={e=>onChange({motion:e.target.checked})}/>轻微呼吸与表情过渡</label>
    <label className="vn-check"><input type="checkbox" checked={preferences.showPortrait} onChange={e=>onChange({showPortrait:e.target.checked})}/>显示任务状态头像</label>
    <label className="vn-check"><input type="checkbox" checked={preferences.textShadow} onChange={e=>onChange({textShadow:e.target.checked})}/>文字阅读描边</label></fieldset>
  </div>;
}

function Modal({panel,preferences,sessions,current,close,update,openSession,newSession}){
  const ref=useRef(null);
  useEffect(()=>{
    const previous=document.activeElement;const root=ref.current;if(!root)return;
    root.querySelector('button')?.focus({preventScroll:true});
    const key=e=>{
      if(e.isComposing)return;
      if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close();return;}
      if(e.key==='Tab'){
        const nodes=[...root.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length);
        if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];
        if(e.shiftKey&&(document.activeElement===first||!root.contains(document.activeElement))){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown',key,true);return()=>{document.removeEventListener('keydown',key,true);if(previous instanceof HTMLElement&&previous.isConnected)previous.focus({preventScroll:true});};
  },[panel]);
  const list=Object.values(sessions.byId??{}).filter(item=>item&&typeof item.id==='string'||item&&typeof item.sessionId==='string');
  return createPortal(<div className="vn-modal-mask" data-neko-modal="" onPointerDown={e=>{if(e.target===e.currentTarget)close();}}><section className="vn-modal" role="dialog" aria-modal="true" aria-labelledby="vn-modal-title" ref={ref}>
    <header><h2 id="vn-modal-title">{panel==='sessions'?'读取会话':'人物与场景'}</h2><button type="button" aria-label="关闭" className="vn-close" onClick={close}>×</button></header>
    <div className="vn-modal-content">{panel==='sessions'?<><p className="vn-explanation">选择会话继续工作。此处沿用原生对话，不回滚文件。</p><div className="vn-saves"><button type="button" className="vn-save-card vn-save-new" onClick={()=>{newSession();close();}}><span>＋</span><strong>新的对话</strong><small>返回主界面</small></button>{list.map(item=>{const id=item.id??item.sessionId;return <button type="button" key={id} className="vn-save-card" aria-current={id===current?'true':undefined} onClick={()=>{openSession(id);close();}}><div className="vn-save-preview" style={{backgroundImage:`url('${asset(sceneFor(preferences.scene).file)}')`}}/><strong>{item.displayTitle||item.title||item.name||'未命名对话'}</strong><small>{item.running?'正在运行':'继续对话'}</small></button>;})}</div></>:<Appearance preferences={preferences} onChange={update}/>}</div>
  </section></div>,document.body);
}

function NativeActions({useUI,openPanel,toggleEnabled}){
  const ui=useUI(s=>s);return <div className="vn-native-actions" data-neko-actions="">
    <GameButton icon="clock" label="会话存档" onClick={()=>openPanel('sessions')}/>
    <GameButton icon="paw" label="人物与场景" onClick={()=>openPanel('characters')}/>
    <GameButton icon="hide" label={ui.preferences.enabled?'切回原界面':'启用家有大猫界面'} onClick={toggleEnabled}/>
  </div>;
}

function Stage({useUI,useMood,useSessions,usePanelInfo,updatePreferences,openPanel,closePanel,toggleLeft,toggleRight,openSession,newSession}){
  const ui=useUI(s=>s);const moodState=useMood(s=>s);const sessions=useSessions(s=>s);const current=currentSession(sessions);const preferences=ui.preferences;const mood=MOODS[moodState.mood]??MOODS.idle;
  const panel=usePanelInfo(state=>state.activePanelId);const sceneVisible=!['plugins','schedules'].includes(panel);
  const role=roleForSelection(preferences.left,preferences.right,preferences.persona);
  const busy=['thinking','working','speaking','waiting','approval'].includes(moodState.mood);
  const [binding,setBinding]=useState('pending');const [musicMount,setMusicMount]=useState(null);
  const selection=useRef(null),remeasure=useRef(()=>{});selection.current={left:preferences.left,right:preferences.right,expression:mood.expression,showPortrait:preferences.showPortrait};
  const stage=useRef(null);const [mount,setMount]=useState(null);const [room,setRoom]=useState({left:0,top:0,width:0,height:0,footer:180,spriteHeight:0,leftX:40,rightX:800,composerLeft:40,composerRight:40,composerTop:640,leftOpen:false,rightOpen:false});
  useEffect(()=>{if(busy)return;const controller=new AbortController();setBinding('pending');fetch('/nekojishi-ui/persona',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:current??null,left:preferences.left,right:preferences.right,enabled:preferences.persona}),signal:controller.signal}).then(response=>{if(!response.ok)throw Error('Role binding unavailable');return response.json();}).then(()=>setBinding('ready')).catch(error=>{if(error.name!=='AbortError')setBinding('error');});return()=>controller.abort();},[current,preferences.left,preferences.right,preferences.persona,busy]);
  useEffect(()=>{remeasure.current();},[preferences.left,preferences.right,preferences.showPortrait,preferences.persona,mood.expression,panel]);
  useEffect(()=>{
    const sidebar=document.querySelector('[data-neko-sidebar]');if(!sidebar)return;const anchor=document.createElement('div');anchor.dataset.nekoMusicMount='';
    const place=()=>{if(anchor.isConnected)return;const buttons=[...sidebar.querySelectorAll('button[aria-label]')].filter(button=>/^(新建会话|新建对话|New session|New conversation|New chat)$/i.test(button.getAttribute('aria-label')));const button=buttons.at(-1);if(button){button.after(anchor);setMusicMount(anchor);}};
    place();const observer=new MutationObserver(place);observer.observe(sidebar,{childList:true,subtree:true});return()=>{observer.disconnect();anchor.remove();};
  },[]);
  useLayoutEffect(()=>{
    const root=stage.current;const layer=root?.closest('[data-shell-overlay]');const frame=layer?.parentElement;
    if(!root||!frame)return;
    const center=frame.children[1];const sidebar=frame.children[0];if(!(center instanceof HTMLElement))return;
    frame.dataset.nekoFrame='';center.dataset.nekoCenter='';setMount(center);if(sidebar instanceof HTMLElement)sidebar.dataset.nekoSidebar='';
    let animation=0,seat,disposed=false;const tagged=new Set();
    const measure=()=>{
      animation=0;if(disposed)return;const rect=center.getBoundingClientRect();const frameRect=frame.getBoundingClientRect();
      const nextSeat=center.querySelector('[data-composer-seat]');if(nextSeat!==seat){if(seat)observer.unobserve(seat);seat=nextSeat;if(seat)observer.observe(seat);}
      const footer=seat?.querySelector('[data-question-key]')?180:seat?.getBoundingClientRect().height??180;
      const card=center.querySelector('[data-composer-card]')?.getBoundingClientRect();
      const portrait=center.querySelector('.vn-status');const g=geometry(rect.width,card?{left:card.left-rect.left,width:card.width,top:card.top-rect.top}:{top:rect.height-footer},{...selection.current,height:rect.height,portraitWidth:portrait?.offsetWidth??150});
      const next={left:rect.left-frameRect.left,top:rect.top-frameRect.top,width:rect.width,height:rect.height,footer,spriteHeight:g.character,leftX:g.leftX,rightX:g.rightX,composerLeft:g.composerLeft,composerRight:g.composerRight,composerTop:g.composerTop,leftOpen:!frame.hasAttribute('data-sidebar-collapsed'),rightOpen:!frame.hasAttribute('data-rightbar-collapsed')};
      setRoom(old=>Object.keys(next).every(k=>old[k]===next[k])?old:next);
      center.style.setProperty('--vn-safe-side',`${g.safe}px`);
      center.style.setProperty('--vn-flow-width',`${Math.max(240,g.flowWidth)}px`);center.style.setProperty('--vn-flow-offset',`${g.flowOffset}px`);
      const nativeColumn=center.querySelector('[data-conversation-content]');if(nativeColumn){nativeColumn.dataset.nekoContent='';tagged.add(nativeColumn);}
    };
    const schedule=()=>{if(!animation)animation=requestAnimationFrame(measure);};
    remeasure.current=schedule;
    const observer=new ResizeObserver(schedule);observer.observe(center);
    const attributes=new MutationObserver(schedule);attributes.observe(frame,{attributes:true,attributeFilter:['data-sidebar-collapsed','data-rightbar-collapsed','data-rightbar-fullscreen','style']});
    const children=new MutationObserver(records=>{
      // Streamed text never triggers geometry reads. Observe only replaced seats.
      if(records.some(record=>[...record.addedNodes].some(node=>node instanceof Element&&(node.matches('[data-composer-seat],[data-conversation-content]')||node.querySelector('[data-composer-seat],[data-conversation-content]')))||[...record.removedNodes].some(node=>node===seat||node instanceof Element&&seat&&node.contains(seat))))schedule();
    });children.observe(center,{childList:true,subtree:true});
    measure();
    // Start in the requested uncluttered scene. Later user toggles remain native.
    if(!frame.hasAttribute('data-sidebar-collapsed'))toggleLeft();
    return()=>{disposed=true;remeasure.current=()=>{};cancelAnimationFrame(animation);observer.disconnect();attributes.disconnect();children.disconnect();delete frame.dataset.nekoFrame;delete center.dataset.nekoCenter;for(const property of ['--vn-safe-side','--vn-flow-width','--vn-flow-offset'])center.style.removeProperty(property);if(sidebar instanceof HTMLElement)delete sidebar.dataset.nekoSidebar;for(const node of tagged)delete node.dataset.nekoContent;};
  },[]);
  useEffect(()=>{
    const html=document.documentElement;const oldScene=html.style.getPropertyValue('--vn-scene');const old={enabled:html.getAttribute('data-neko-enabled'),scene:html.getAttribute('data-neko-scene'),motion:html.getAttribute('data-neko-motion'),shadow:html.getAttribute('data-neko-shadow')};
    html.setAttribute('data-neko-enabled',String(preferences.enabled));html.setAttribute('data-neko-scene',preferences.scene);html.setAttribute('data-neko-motion',String(preferences.motion));html.setAttribute('data-neko-shadow',String(preferences.textShadow));
    html.style.setProperty('--vn-scene',`url("${asset(sceneFor(preferences.scene).file)}")`);
    return()=>{if(oldScene)html.style.setProperty('--vn-scene',oldScene);else html.style.removeProperty('--vn-scene');for(const [key,value] of Object.entries(old)){const name='data-neko-'+key;if(value===null)html.removeAttribute(name);else html.setAttribute(name,value);}};
  },[preferences.enabled,preferences.scene,preferences.motion,preferences.textShadow]);
  const left=CHARACTERS[preferences.left],right=CHARACTERS[preferences.right];const portraitRole=preferences.right!=='none'?preferences.right:preferences.left;const portraitCharacter=CHARACTERS[portraitRole];
  return <div className="vn-shell" ref={stage} data-neko-shell="" data-mood={moodState.mood} data-enabled={preferences.enabled} data-persona-status={binding} data-role={role??'none'}>
    {musicMount&&createPortal(<MusicPlayer/>,musicMount)}
    {preferences.enabled&&<>{mount&&createPortal(<div className="vn-stage" data-neko-stage="" data-mood={moodState.mood} data-scene-visible={sceneVisible} data-compact={room.width<620} style={{'--vn-footer':`${room.footer}px`,'--vn-sprite-height':`${room.spriteHeight}px`,'--vn-left-x':`${room.leftX}px`,'--vn-right-x':`${room.rightX}px`,'--vn-composer-left':`${room.composerLeft}px`,'--vn-composer-right':`${room.composerRight}px`,'--vn-composer-bottom':`${Math.max(0,room.height-room.composerTop)}px`}}>
      <div className="vn-vignette"/>
      {sceneVisible&&preferences.left!=='none'&&<img className="vn-character vn-character-left" data-neko-character="left" src={asset(left[mood.expression])} alt={left.name} draggable="false"/>}
      {sceneVisible&&preferences.right!=='none'&&<img className="vn-character vn-character-right" data-neko-character="right" src={asset(right[mood.expression])} alt={right.name} draggable="false"/>}
      {sceneVisible&&preferences.showPortrait&&portraitRole!=='none'&&<div className="vn-status" role="status" aria-live="polite"><img src={asset(`${portraitRole}-portrait-${mood.portrait}.png`)} alt=""/><span><strong>{portraitCharacter.name}</strong><small>{mood.label}</small>{role&&<small className="vn-role-label">角色表达 · {CHARACTERS[role].name}</small>}</span></div>}
      {sceneVisible&&!current&&<div className="vn-main-title"><img src={asset('logo.png')} alt="家有大猫"/></div>}
    </div>,mount)}
    <div className="vn-side-toggle vn-side-toggle-left"><GameButton icon="clock" label={room.leftOpen?'收起对话与账户栏':'打开对话与账户栏'} aria-expanded={room.leftOpen} onClick={toggleLeft}/></div>
    <div className="vn-side-toggle vn-side-toggle-right"><GameButton icon="paper" label={room.rightOpen?'收起资源栏':'打开资源栏'} aria-expanded={room.rightOpen} onClick={toggleRight} disabled={!current}/></div></>}
    {ui.notice&&<div className="vn-notice" role="alert">{ui.notice}</div>}
    {ui.panel&&<Modal panel={ui.panel} preferences={preferences} sessions={sessions} current={current} close={closePanel} update={updatePreferences} openSession={openSession} newSession={newSession}/>}
  </div>;
}

export async function apply(ctx){
  const ready=await fetch('/nekojishi-assets/manifest.json').then(response=>response.ok).catch(()=>false);
  if(!ready){console.warn('Nekojishi resources are not imported; leaving the native interface unchanged.');return;}
  const ui=makeUI(),mood=makeMood(ctx);ctx.effect(()=>()=>mood.dispose(),'nekojishi: state');
  ctx.effect(()=>{
    let dispose=()=>{},enabled;
    const sync=()=>{const next=ui.getSnapshot().preferences.enabled;if(enabled===next)return;enabled=next;dispose();dispose=()=>{};
      if(next){const values={
        '--dsw-alias-bg-base':'transparent','--dsw-specific-sidebar-fill':'transparent',
        '--dsw-alias-bg-layer-1':'#1b2330df','--dsw-alias-bg-layer-2':'#202837ef','--dsw-alias-bg-module-platform':'#18212cdd',
        '--dsw-alias-button-elevated-fill':'#273446df','--dsw-alias-button-floating-fill':'#273446df','--dsw-alias-button-floating-hover':'#34475cf0',
        '--dsw-alias-label-primary':'#f4f2ed','--dsw-alias-label-primary-dimmed':'#e7e3db','--dsw-alias-label-secondary':'#d8d4cc','--dsw-alias-label-tertiary':'#c3beb4','--dsw-alias-label-caption':'#b8b3aa','--dsw-alias-menu-icon':'#e4dfd5',
        '--dsw-specific-bubble':'#10151d66','--dsw-specific-menu':'#20252ff5','--dsw-menu-surface-fill':'#20252ff5','--dsw-alias-menu-group-header-fill':'#252a35f5',
        '--dsw-specific-sidebar-nav-item-active':'#ffffff14','--dsw-specific-sidebar-nav-item-hover':'#ffffff0c',
        '--dsw-alias-markdown-code-block':'#171c25ed','--dsw-alias-markdown-code-block-banner':'#252a33ed',
      };dispose=ctx.theme.overrideTokens(ID,Object.fromEntries(Object.entries(values).map(([k,v])=>[k,{light:v,dark:v}])));}
    };const off=ui.subscribe(sync);sync();return()=>{off();dispose();};
  },'nekojishi: reversible theme tokens');
  ctx.effect(()=>{const style=document.createElement('style');style.dataset.plugin=ID;style.textContent=__NEKO_CSS__;document.head.appendChild(style);return()=>style.remove();},'nekojishi: styles');
  const common=()=>({hooks:{uI:ui},openPanel:ui.panel,toggleEnabled:()=>ui.preferences({enabled:!ui.getSnapshot().preferences.enabled})});
  // Framework names injected `uI` as useUI; no independent React subscriptions.
  ctx.slots.inject('shell.overlay',()=>ctx.slots.register({name:'shell.overlay',id:'nekojishi-stage',order:10,inject:()=>({hooks:{uI:ui,mood},
    updatePreferences:ui.preferences,openPanel:ui.panel,closePanel:()=>ui.panel(null),
    toggleLeft:()=>ctx.layout.toggleSidebar(),
    toggleRight:()=>{try{ctx.sidebarRight.toggleExpanded();}catch(error){ui.notice('请先选择工作区或打开一个对话。');console.warn('Resource sidebar is not ready',error);}},
    openSession:id=>ctx.uiWorkspace.openSession(id),newSession:()=>ctx.uiWorkspace.startSession(),
  })},Stage));
  ctx.slots.inject('conversation.input.right',()=>ctx.slots.register({name:'conversation.input.right',id:'nekojishi-controls',order:100,inject:common},NativeActions));
}
