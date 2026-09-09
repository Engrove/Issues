// AI-CODING NOTE: Add exactly three new versioned release assets. Never replace
// or delete existing assets, alter release metadata, or update main.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const headers={Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
const response=await fetch('https://api.github.com/repos/Engrove/Issues/releases/tags/EngroveAudio',{headers});
if(!response.ok)throw Error('Release lookup failed: '+response.status);
const release=await response.json();
if(release.id!==369114941||release.tag_name!=='EngroveAudio')throw Error('Unexpected release identity');
for(const [suffix,type] of [['.wav','audio/wav'],['.manifest.json','application/json'],['.README.md','text/markdown']]){
  const name='ENGROVE-GUIDED-BASS-STEPS-v1.0.0'+suffix,data=readFileSync('signals/'+name);
  const digest='sha256:'+createHash('sha256').update(data).digest('hex');
  if(suffix==='.wav'&&digest!=='sha256:13f41c78c47942e9c35682ff0b052d9809b0b133ffd3dd2fa99da0300d09922d')throw Error('Unexpected WAV digest');
  const existing=release.assets.find(a=>a.name===name);
  if(existing){if(existing.digest!==digest||existing.size!==data.length)throw Error('Refusing replacement: '+name);continue;}
  const url=new URL(release.upload_url.split('{')[0]);
  if(url.origin!=='https://uploads.github.com'||url.pathname!=='/repos/Engrove/Issues/releases/369114941/assets')throw Error('Unexpected upload target');
  url.searchParams.set('name',name);
  const upload=await fetch(url,{method:'POST',headers:{...headers,'Content-Type':type},body:data});
  if(!upload.ok)throw Error('Upload failed '+upload.status+' '+name);
  const asset=await upload.json();if(asset.digest!==digest||asset.size!==data.length)throw Error('Asset verification failed');
  console.log('Verified '+name+' '+digest);
}
