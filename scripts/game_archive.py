"""Read only simple RPA indexes from the user's local game, without pickle globals."""
import io,pickle,zlib,os
from pathlib import Path
class IndexReader(pickle.Unpickler):
 def find_class(self,module,name):raise ValueError('Unexpected archive object')
class GameArchive:
 def __init__(self):
  self.archives=[]
  for name in ['data.rpa','media.rpa']:
   stream=(Path(os.environ['NEKOJISHI_GAME_DIR'])/name).open('rb')
   h=stream.readline().decode('ascii').split();stream.seek(int(h[1],16));key=int(h[2],16)
   self.archives.append((stream,key,IndexReader(io.BytesIO(zlib.decompress(stream.read())),encoding='latin1').load()))
 def names(self):return sorted({n.decode() if isinstance(n,bytes) else n for _,_,idx in self.archives for n in idx})
 def read(self,name):
  for stream,key,idx in self.archives:
   raw=name if name in idx else name.encode()
   if raw not in idx:continue
   chunks=[]
   for entry in idx[raw]:
    prefix=entry[2] if len(entry)>2 else b''
    if isinstance(prefix,str):prefix=prefix.encode('latin1')
    stream.seek(entry[0]^key);chunks.append(prefix+stream.read((entry[1]^key)-len(prefix)))
   return b''.join(chunks)
  raise KeyError(name)
 def close(self):
  for stream,_,_ in self.archives:stream.close()
