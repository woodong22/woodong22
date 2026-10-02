import { readFile, writeFile } from 'node:fs/promises';
const owner = process.env.GITHUB_REPOSITORY_OWNER || 'woodong22';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'profile-overview' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
async function get(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub API: ${response.status} ${path}`);
  return response.json();
}
const user = await get(`/users/${owner}`);
const repos = [];
for (let page = 1; ; page++) {
  const batch = await get(`/users/${owner}/repos?per_page=100&page=${page}`);
  repos.push(...batch);
  if (batch.length < 100) break;
}
const languages = {};
for (const repo of repos.filter(repo => !repo.fork && repo.name !== owner)) {
  const counts = await get(`/repos/${owner}/${repo.name}/languages`);
  for (const [language, bytes] of Object.entries(counts)) languages[language] = (languages[language] || 0) + bytes;
}
let entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
if (entries.length > 3) entries = [...entries.slice(0, 2), ['Other', entries.slice(2).reduce((sum, [, bytes]) => sum + bytes, 0)]];
const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
const colors = ['#8cb9d5', '#a6cdbd', '#b4b8de'];
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let svg = await readFile(new URL('./overview-template.svg', import.meta.url), 'utf8');
svg = svg.replace(/(<text x="280" y="118"[^>]*>).*?(<\/text>)/, `$1${user.public_repos}$2`);
svg = svg.replace(/(<text x="280" y="169"[^>]*>).*?(<\/text>)/, `$1${user.followers}$2`);
const date = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Asia/Seoul'}).format(new Date()).replaceAll('-', '.');
svg = svg.replace(/Snapshot \d{4}\.\d{2}\.\d{2}/, `Updated ${date}`).replace('PUBLIC REPOSITORIES / CODE BYTES', 'ORIGINAL REPOSITORIES / CODE BYTES');
let start = 493;
const bars = entries.map(([, bytes], index) => {
  const end = start + 365 * bytes / total;
  const path = `<path d="M${start} 88.5H${end}" stroke="${colors[index]}" stroke-width="9"/>`;
  start = end;
  return path;
}).join('');
svg = svg.replace(/<g clip-path="url\(#bar\)">.*?<\/g>/, `<g clip-path="url(#bar)">${bars}</g>`);
const rows = entries.map(([language, bytes], index) => {
  const y = 130 + index * 32;
  return `<circle cx="489" cy="${y - 4}" r="4" fill="${colors[index]}"/><text x="502" y="${y}" font-size="13" fill="#526f86">${escape(language)}</text><text x="817" y="${y}" font-size="13" fill="#7290a6">${(bytes / total * 100).toFixed(1)}%</text>`;
}).join('\n');
svg = svg.replace(/<circle cx="489"[\s\S]*?(?=<text x="483" y="220")/, rows + '\n');
await writeFile(new URL('../assets/github-overview.svg', import.meta.url), svg);
console.log('Updated public profile overview.');

