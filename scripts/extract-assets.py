import io,json,pickle,zlib,re,os
from pathlib import Path
class IndexReader(pickle.Unpickler):
 def find_class(self,module,name):raise ValueError('Unexpected archive object')
game=Path(os.environ['NEKOJISHI_GAME_DIR']);dest=Path(__file__).resolve().parents[1]/'assets';dest.mkdir(exist_ok=True)
archives=[]
for filename in ['data.rpa','media.rpa']:
 stream=(game/filename).open('rb');h=stream.readline().decode('ascii').split();stream.seek(int(h[1],16));key=int(h[2],16)
 idx=IndexReader(io.BytesIO(zlib.decompress(stream.read())),encoding='latin1').load();archives.append((stream,key,idx))
def get(name):
 for stream,key,idx in archives:
  raw=name if name in idx else name.encode()
  if raw not in idx:continue
  chunks=[]
  for e in idx[raw]:
   prefix=e[2] if len(e)>2 else b''
   if isinstance(prefix,str):prefix=prefix.encode('latin1')
   stream.seek(e[0]^key);chunks.append(prefix+stream.read((e[1]^key)-len(prefix)))
  return b''.join(chunks)
 raise KeyError(name)
mapping={'room-night.png':'bg/002_chara_deskroom_night.png','room-day.png':'bg/002_chara_deskroom_day.png','dialogue.png':'ui/frame_b04.png','choice.png':'ui/frame_f01.png','choice-hover.png':'ui/frame_f02.png','save-card.png':'ui/frame_c02.png','save-card-active.png':'ui/frame_c01.png','portrait-frame.png':'side image/frame_b03.png'}
for alias,raw in list(mapping.items()):
 (dest/alias).write_bytes(get(raw))
for key,prefix in [('tig','tig'),('lpd','lpd'),('lpdcat','cat')]:
 sources={'normal':f'character/{prefix}-002_chara_deskroom_F-1.png','happy':f'character/{prefix}C-002_chara_deskroom_F-1.png','concern':f'character/{prefix}C-002_chara_deskroom_day.png'}
 if key=='lpdcat':sources={'normal':'character/cat-002_chara_deskroom_F-1.png','happy':'character/cat_2-002_chara_deskroom_F-1.png','concern':'character/cat-002_chara_deskroom_day.png'}
 for expression,raw in sources.items():
  try:data=get(raw)
  except KeyError:data=get(sources['normal'])
  (dest/f'{key}-{expression}.png').write_bytes(data)
defs=get('script/define.rpy').decode('utf-8-sig')
for char,imagekey in [('tig','Stig'),('lpd','Slpd'),('lpdcat','Slpdcat')]:
 for expression in ['normal','laugh','serious','confused','difficult']:
  aliases={'laugh':['laugh','laugh_1'],'serious':['serious','frown','obsessed'],'confused':['confused','surprise'],'difficult':['difficult','disappointed','worry']}.get(expression,[expression])
  raw=None
  for option in aliases:
   m=re.search(r'^image side '+imagekey+' '+option+r'\s*=\s*im.Composite\((.*?)\n\s*\)',defs,re.M|re.S)
   if m:
    n=re.search(r'"(side image/[^"\n]+\.png)"',m[1]);raw=n[1] if n else None
    if raw:break
  if not raw:raise ValueError((char,expression))
  (dest/f'{char}-portrait-{expression}.png').write_bytes(get(raw))
for name in ['clock','gear','paper','hide','auto_forward','speedup','paw','home']:
 for suffix in ['a','b']:
  try:(dest/f'icon-{name}-{suffix}.png').write_bytes(get(f'ui/ico_{name}_{suffix}.png'))
  except KeyError:pass
(dest/'logo.png').write_bytes(get('bg/bigcat_logo_ch_s.png'))
backgrounds=sorted({name.decode() if isinstance(name,bytes) else name for _,_,idx in archives for name in idx if (name.decode() if isinstance(name,bytes) else name).startswith('bg/') and str(name).lower().endswith(('.png','.jpg','.jpeg'))})
labels={'001':'开场','002':'家中房间','003':'餐厅','004':'教室','005':'社团活动室','006':'温泉','007':'乌来','008':'家乐福','009':'西门町','010':'公交车站','011':'山路','012':'桐花步道','013':'桐花地面','014':'图书馆','015':'洞穴','016':'山中','017':'山景','018':'森林','019':'游戏厅','020':'迪化街'}
scenes=[]
for raw in backgrounds:
 filename=Path(raw).name
 if raw==mapping['room-night.png']:key='night';alias='room-night.png';label='家中房间 · 夜晚'
 elif raw==mapping['room-day.png']:key='day';alias='room-day.png';label='家中房间 · 白天'
 else:
  key='bg-'+Path(raw).stem;alias='scene-'+filename
  label='浴室' if 'bathroom' in filename else labels.get(filename[:3],Path(raw).stem)
  if filename[:3] in labels:
   suffix=' · 夜晚' if re.search(r'(night|_n[_.])',filename) else ' · 白天' if re.search(r'(day|_d[_.])',filename) else ''
   label+=suffix
  (dest/alias).write_bytes(get(raw))
 scenes.append({'id':key,'file':alias,'label':label,'source':raw,'group':'场景' if re.match(r'\d{3}_',filename) else '其他背景'})
scenes.sort(key=lambda s:(s['id'] not in ['night','day'],s['group']!='场景',s['source']))
(dest.parent/'src'/'scenes.json').write_text(json.dumps(scenes,ensure_ascii=False,indent=2),encoding='utf-8')
files=sorted(p.name for p in dest.iterdir() if p.is_file() and p.name!='manifest.json')
(dest/'manifest.json').write_text(json.dumps({'files':files+['manifest.json'],'origin':'User-local Nekojishi 1.06s installation; personal customization','canvas':[1200,900]},ensure_ascii=False,indent=2),encoding='utf-8')
for stream,_,_ in archives:stream.close()
print('Extracted',len(files),'reused game assets.')
