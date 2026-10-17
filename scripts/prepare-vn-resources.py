import json,re,hashlib
from pathlib import Path
from PIL import Image
from game_archive import GameArchive
root=Path(__file__).resolve().parents[1];assets=root/'assets';archive=GameArchive()
music=[]
for source in archive.names():
 if not source.startswith('music/') or not source.lower().endswith(('.mp3','.ogg','.wav')):continue
 name='music-'+Path(source).name;data=archive.read(source);(assets/name).write_bytes(data)
 music.append({'id':Path(source).stem,'title':Path(source).stem.replace('_',' '),'file':name,'source':source})
(root/'src'/'music.json').write_text(json.dumps(music,ensure_ascii=False,indent=2),encoding='utf-8')
contours={}
for path in assets.glob('*.png'):
 if not re.match(r'(tig|lpd|lpdcat)-(normal|happy|concern)\.png$',path.name):continue
 image=Image.open(path).convert('RGBA');alpha=image.getchannel('A');width,height=image.size;rows=[]
 for band in range(128):
  top=round(height*band/128);bottom=max(top+1,round(height*(band+1)/128))
  bbox=alpha.crop((0,top,width,min(height,bottom))).point(lambda a:255 if a>=32 else 0).getbbox()
  rows.append(None if bbox is None else [round(bbox[0]/width,5),round(bbox[2]/width,5)])
 contours[path.name]={'width':width,'height':height,'ratio':round(width/height,6),'rows':rows}
(root/'src'/'contours.json').write_text(json.dumps(contours,separators=(',',':')),encoding='utf-8')
corpus={role:[] for role in ['tig','lpd','lpdcat']};sources=[]
for source in archive.names():
 if not source.startswith('tl/zhHans/script/') or not source.endswith('.rpy'):continue
 data=archive.read(source);text=data.decode('utf-8-sig');label=''
 sources.append({'path':source,'sha256':hashlib.sha256(data).hexdigest()})
 for line_number,line in enumerate(text.splitlines(),1):
  match=re.match(r'\s*(?:label|translate\s+\S+)\s+([^:]+):',line)
  if match:label=match[1]
  match=re.match(r'\s*(tig|lpdcat|lpd)(?:2|_naked|_b|_r|_g)?\b[^"\n]*"((?:[^"\\]|\\.)*)"\s*$',line)
  if not match:continue
  role,dialogue=match.groups();dialogue=re.sub(r'\{[^}]*\}','',dialogue).replace('\\n',' ')
  if dialogue:corpus[role].append({'source':source,'line':line_number,'label':label,'text':dialogue})
for role,lines in corpus.items():
 folder=root/'skills'/('nekojishi-'+role)/'references';folder.mkdir(parents=True,exist_ok=True)
 (folder/'dialogue.jsonl').write_text('\n'.join(json.dumps(line,ensure_ascii=False) for line in lines)+'\n',encoding='utf-8')
(root/'skills'/'provenance.json').write_text(json.dumps({'game':'User-local Nekojishi 1.06s','language':'zhHans','sources':sources,'dialogueCounts':{role:len(lines) for role,lines in corpus.items()}},ensure_ascii=False,indent=2),encoding='utf-8')
files=sorted(path.name for path in assets.iterdir() if path.is_file() and path.name!='manifest.json');manifest=json.loads((assets/'manifest.json').read_text(encoding='utf-8'));manifest['files']=files+['manifest.json'];(assets/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
archive.close();print(json.dumps({'music':len(music),'alphaProfiles':len(contours),'dialogueCounts':{role:len(lines) for role,lines in corpus.items()}},ensure_ascii=True))
