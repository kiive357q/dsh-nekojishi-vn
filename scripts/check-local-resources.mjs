import {readFile,stat} from 'node:fs/promises';
import {join} from 'node:path';
try{
 const pack=JSON.parse(await readFile('src/resource-pack.json','utf8'));
 if(pack.kind==='demo'){await stat('demo-assets/manifest.json');console.log('Original demo pack ready; no game resources included.');process.exit(0);}
 const manifest=JSON.parse(await readFile('assets/manifest.json','utf8'));
 if(!Array.isArray(manifest.files)||manifest.files.length<150)throw Error('Incomplete local asset manifest');
 for(const name of manifest.files){if(name.includes('/')||name.includes('\\')||name==='..')throw Error('Invalid manifest entry');await stat(join('assets',name));}
 for(const role of ['tig','lpd','lpdcat'])await stat(`skills/nekojishi-${role}/references/dialogue.jsonl`);
 console.log('Local resources present. The resulting complete package contains third-party content; keep it local.');
}catch(error){console.error('Run python scripts/import-resources.py --game-dir <your-game-folder> before building a local install package. '+error.message);process.exitCode=1;}
