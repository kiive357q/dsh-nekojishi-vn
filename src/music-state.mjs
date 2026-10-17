export const formatTime=value=>{const seconds=Number.isFinite(value)?Math.max(0,Math.floor(value)):0;return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;};
export function parsePlaylist(text,filename,tracks){
 const byName=new Map(tracks.flatMap(track=>[[track.name??track.file,track.id],[track.title,track.id],[track.id,track.id]]));let title=filename.replace(/\.[^.]+$/,'');let items=[];
 if(/\.json$/i.test(filename)){const data=JSON.parse(text);title=typeof data.name==='string'?data.name:title;const list=Array.isArray(data)?data:data.tracks;if(!Array.isArray(list))throw Error('JSON 歌单需要 tracks 数组');items=list.map(item=>typeof item==='string'?item:item.file??item.name??item.id??'');}
 else if(/\.pls$/i.test(filename))items=[...text.matchAll(/^File\d+=(.*)$/gmi)].map(match=>match[1].trim());
 else items=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(line=>line.trim()&&!line.trim().startsWith('#')).map(line=>line.trim());
 const ids=[],missing=[];
 for(const item of items){const name=item.replaceAll('\\','/').split('/').at(-1);const id=byName.get(item)??byName.get(name);if(id)ids.push(id);else missing.push(name);}
 return {id:'playlist-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name:title,trackIds:[...new Set(ids)],missing};
}
export function openMusicDatabase(){return new Promise((resolve,reject)=>{const request=indexedDB.open('dsh-nekojishi-music',1);request.onupgradeneeded=()=>{for(const name of ['tracks','playlists'])if(!request.result.objectStoreNames.contains(name))request.result.createObjectStore(name,{keyPath:'id'});};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
export async function musicReadAll(store){const database=await openMusicDatabase();try{return await new Promise((resolve,reject)=>{const request=database.transaction(store).objectStore(store).getAll();request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}finally{database.close();}}
export async function musicSave(store,items){const database=await openMusicDatabase();try{await new Promise((resolve,reject)=>{const transaction=database.transaction(store,'readwrite');for(const item of items)transaction.objectStore(store).put(item);transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error);});}finally{database.close();}}
