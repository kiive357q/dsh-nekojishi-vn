import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const {name:id,version}=JSON.parse(await readFile('package.json','utf8'));
await mkdir('lib', { recursive: true });
await build({ entryPoints:['src/index.mjs'], outfile:'lib/index.js', bundle:true, platform:'node', format:'esm', target:'node22', sourcemap:true });
const css = await readFile('src/theme.css','utf8');
await build({ entryPoints:['src/client.jsx'], outfile:'lib/client.js', bundle:true, platform:'browser', format:'cjs', target:'chrome130', jsx:'automatic', external:['react','react/jsx-runtime','react-dom','react-dom/client'], define:{ 'process.env.NODE_ENV':'"production"', '__NEKO_CSS__':JSON.stringify(css) },
  banner:{js:`window.__ModuleLoader__.load({id:${JSON.stringify(id)},factory:(require)=>{var module={exports:{}};var exports=module.exports;`}, footer:{js:'return module.exports;}});'}, sourcemap:true });
await writeFile('lib/build-info.json',JSON.stringify({package:id,version,dsh:'0.2.1-rc.2',built:new Date().toISOString()},null,2));
console.log('Built host and module-loader client bundle.');
