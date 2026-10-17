import React,{useEffect,useRef,useState} from 'react';
import builtin from './music.json';
import {formatTime,parsePlaylist,musicReadAll,musicSave} from './music-state.mjs';
const baseTracks=builtin.map(track=>({...track,name:track.source.slice(6),url:'/nekojishi-assets/'+encodeURIComponent(track.file)}));
const builtInLabel=builtin[0]?.credit?'内置演示':'游戏原声';
function savedMusic(){try{return JSON.parse(localStorage.getItem('dsh.nekojishi.music.v1')??'{}');}catch{return {};}}
export function MusicPlayer(){
 const [tracks,setTracks]=useState(baseTracks),[playlists,setPlaylists]=useState([]),[playlist,setPlaylist]=useState('original');
 const [current,setCurrent]=useState(()=>savedMusic().current??'Title'),[playing,setPlaying]=useState(false),[time,setTime]=useState(0),[duration,setDuration]=useState(0),[volume,setVolume]=useState(()=>Number.isFinite(savedMusic().volume)?Math.max(0,Math.min(1,savedMusic().volume)):.35),[shuffle,setShuffle]=useState(false),[expanded,setExpanded]=useState(false),[notice,setNotice]=useState('');
 const audio=useRef(null),picker=useRef(null),wantPlay=useRef(false);const [loading,setLoading]=useState(true);
 const list=playlist==='original'?baseTracks:playlist==='all'?tracks:(playlists.find(item=>item.id===playlist)?.trackIds??[]).map(id=>tracks.find(track=>track.id===id)).filter(Boolean);
 const track=tracks.find(item=>item.id===current)??baseTracks[0];
 useEffect(()=>{let active=true;Promise.all([musicReadAll('tracks'),musicReadAll('playlists')]).then(([saved,savedLists])=>{if(active){setTracks([...baseTracks,...saved]);setPlaylists(savedLists);}}).catch(()=>{if(active)setNotice('无法打开本地音乐库，内置原声仍可播放。');});return()=>{active=false;audio.current?.pause();};},[]);
 useEffect(()=>{
  const element=audio.current;if(!element)return;let url,disposed=false;const controller=new AbortController();element.pause();setLoading(true);setTime(0);setDuration(0);
  // The desktop proxy deliberately strips Content-Length. A selected-song Blob
  // gives Chromium finite duration and accurate seeking under dsh-app:// too.
  const load=async()=>{let blob=track.blob;if(!blob){const response=await fetch(track.url,{signal:controller.signal});if(!response.ok)throw Error('歌曲无法读取');blob=await response.blob();}if(disposed)return;url=URL.createObjectURL(blob);element.src=url;element.load();setLoading(false);if(wantPlay.current)void element.play().catch(()=>{setPlaying(false);setNotice('点击播放以开始音乐。');});};
  void load().catch(error=>{if(!disposed&&error.name!=='AbortError'){setLoading(false);setNotice('歌曲读取失败，请切换曲目或重新导入。');}});
  return()=>{disposed=true;controller.abort();if(url)URL.revokeObjectURL(url);};
 },[track.id]);
 useEffect(()=>{if(audio.current)audio.current.volume=volume;},[volume]);
 useEffect(()=>{try{localStorage.setItem('dsh.nekojishi.music.v1',JSON.stringify({current,volume}));}catch{}},[current,volume]);
 const choose=id=>{wantPlay.current=true;if(id===current){if(!loading)void audio.current.play().catch(()=>setNotice('这首歌曲暂时无法播放。'));}else setCurrent(id);};
 const next=direction=>{if(!list.length)return;const index=list.findIndex(item=>item.id===current);const target=shuffle?Math.floor(Math.random()*list.length):(index+direction+list.length)%list.length;choose(list[target].id);};
 const toggle=()=>{if(!audio.current)return;if(loading){wantPlay.current=!wantPlay.current;setNotice(wantPlay.current?'正在读取歌曲…':'');return;}if(playing){wantPlay.current=false;audio.current.pause();}else{wantPlay.current=true;void audio.current.play().catch(()=>setNotice('这首歌曲暂时无法播放。'));}};
 const importFiles=async event=>{
  const files=[...event.target.files];event.target.value='';if(!files.length)return;
  try{
   const songs=files.filter(file=>!/\.(m3u8?|pls|json)$/i.test(file.name)&&(file.type.startsWith('audio/')||/\.(mp3|ogg|wav|m4a|flac|aac|opus)$/i.test(file.name))).map(file=>({id:`local-${file.size}-${file.lastModified}-${file.name}`,title:file.name.replace(/\.[^.]+$/,''),name:file.name,blob:file}));
   if(songs.length)await musicSave('tracks',songs);const merged=[...tracks];for(const song of songs){const index=merged.findIndex(item=>item.id===song.id);if(index>=0)merged[index]=song;else merged.push(song);}setTracks(merged);
   const additions=[];let missing=[];
   for(const file of files.filter(file=>/\.(m3u8?|pls|json)$/i.test(file.name))){const parsed=parsePlaylist(await file.text(),file.name,merged);additions.push(parsed);missing.push(...parsed.missing);}
   if(songs.length&&!additions.length)additions.push({id:'import-'+Date.now(),name:'导入歌曲',trackIds:songs.map(song=>song.id),missing:[]});
   if(additions.length){await musicSave('playlists',additions);setPlaylists(previous=>[...previous,...additions]);setPlaylist(additions[0].id);}
   setNotice(missing.length?`已导入。缺少 ${missing.length} 首歌曲，请同时选择相应音频文件重新导入歌单。`:`已导入 ${songs.length} 首歌曲、${additions.length} 个歌单。`);setExpanded(true);
  }catch(error){setNotice('导入失败：'+error.message);}
 };
 return <section className="vn-music" aria-label="音乐播放器" data-neko-music="">
  <audio ref={audio} preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>next(1)} onTimeUpdate={event=>setTime(event.currentTarget.currentTime)} onDurationChange={event=>setDuration(Number.isFinite(event.currentTarget.duration)?event.currentTarget.duration:0)} onError={()=>{setPlaying(false);setNotice('无法读取这首歌曲，可切换曲目或重新导入。');}}/>
  <div className="vn-music-heading"><span aria-hidden="true">♫</span><div><strong title={track.title}>{track.title}</strong><small>{track.credit??(track.source?'家有大猫 · 原声':'本地音乐')}</small></div><button type="button" aria-label={expanded?'收起歌单':'展开歌单'} onClick={()=>setExpanded(value=>!value)}>☷</button></div>
  <input type="range" aria-label="播放进度" min="0" max={duration||1} step=".1" value={Math.min(time,duration||0)} disabled={!duration} onChange={event=>{audio.current.currentTime=Number(event.target.value);setTime(Number(event.target.value));}}/>
  <div className="vn-music-time"><span>{formatTime(time)}</span><span>{formatTime(duration)}</span></div>
  <div className="vn-music-controls"><button type="button" aria-label="上一首" onClick={()=>next(-1)}>◀</button><button type="button" aria-label={playing?'暂停音乐':'播放音乐'} onClick={toggle}>{playing?'Ⅱ':'▶'}</button><button type="button" aria-label="下一首" onClick={()=>next(1)}>▶</button><button type="button" aria-label="随机播放" aria-pressed={shuffle} onClick={()=>setShuffle(value=>!value)}>⇄</button><button type="button" aria-label="导入歌曲或歌单" onClick={()=>picker.current.click()}>＋</button></div>
  <label className="vn-music-volume"><span>音量</span><input type="range" aria-label="音乐音量" min="0" max="1" step=".01" value={volume} onChange={event=>setVolume(Number(event.target.value))}/><span>{Math.round(volume*100)}%</span></label>
  <input ref={picker} type="file" multiple accept="audio/*,.mp3,.ogg,.wav,.m4a,.flac,.aac,.opus,.m3u,.m3u8,.pls,.json" hidden onChange={importFiles} aria-label="选择歌曲或歌单文件"/>
  {expanded&&<div className="vn-music-library"><select aria-label="音乐歌单" value={playlist} onChange={event=>setPlaylist(event.target.value)}><option value="original">{builtInLabel} · {baseTracks.length} 首</option><option value="all">全部音乐 · {tracks.length} 首</option>{playlists.map(item=><option key={item.id} value={item.id}>{item.name} · {item.trackIds.length} 首</option>)}</select><div className="vn-music-tracks">{list.map(item=><button type="button" key={item.id} aria-current={current===item.id?'true':undefined} onClick={()=>choose(item.id)}>{item.title}</button>)}{!list.length&&<p>歌单暂无可播放歌曲。</p>}</div></div>}
  {notice&&<p className="vn-music-notice" role="status">{notice}</p>}
 </section>;
}
