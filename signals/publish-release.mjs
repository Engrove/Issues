// AI-CODING NOTE: Additive publication of three explicitly named assets only.
// Never deletes/replaces existing assets or changes release/tag metadata.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const repository = 'Engrove/Issues', tag = 'EngroveAudio';
const prefix = 'ENGROVE-STRUCTURE-COUPLING-v1.0.0';
const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
const response = await fetch(`https://api.github.com/repos/${repository}/releases/tags/${tag}`, { headers });
if (!response.ok) throw Error(`Release lookup failed (${response.status})`);
const release = await response.json();
if (release.id !== 369114941 || release.tag_name !== tag) throw Error('Unexpected release identity.');
for (const [suffix, contentType] of [['.wav', 'audio/wav'], ['.manifest.json', 'application/json'], ['.README.md', 'text/markdown']]) {
  const name = prefix + suffix, data = readFileSync(`signals/assets/${name}`);
  const digest = `sha256:${createHash('sha256').update(data).digest('hex')}`;
  const existing = release.assets.find(asset => asset.name === name);
  if (existing) {
    if (existing.digest !== digest || existing.size !== data.length) throw Error(`Existing asset differs: ${name}; refusing to overwrite.`);
    console.log(`Already verified: ${name}`); continue;
  }
  const upload = new URL(release.upload_url.split('{')[0]);
  if (upload.origin !== 'https://uploads.github.com' || upload.pathname !== `/repos/${repository}/releases/${release.id}/assets`) throw Error('Unexpected upload destination.');
  upload.searchParams.set('name', name);
  const result = await fetch(upload, { method: 'POST', headers: { ...headers, 'Content-Type': contentType }, body: data });
  if (!result.ok) throw Error(`Asset publication failed (${result.status}): ${name}`);
  const asset = await result.json();
  if (asset.name !== name || asset.size !== data.length || asset.digest !== digest) throw Error(`Uploaded asset verification failed: ${name}`);
  console.log(`Published and verified: ${name} ${digest}`);
}
