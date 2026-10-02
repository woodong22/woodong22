import {readFile,writeFile} from 'node:fs/promises';
const raw = await readFile(new URL('../assets/contribution-snake-airy.svg',import.meta.url),'utf8');
const grass = raw.replace('<svg ', '<svg x="20" y="64" ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="350" viewBox="0 0 920 350">
<rect x="1" y="1" width="918" height="348" rx="22" fill="#f4f9fd" stroke="#dfedf6"/>
<text x="34" y="38" font-family="Arial,sans-serif" font-size="13" letter-spacing="2" fill="#63869f">A LITTLE PROGRESS, EVERY DAY</text>
<g fill="#c1dbea"><path d="M866 23l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><circle cx="890" cy="26" r="2"/></g>
${grass}
<path d="M36 311H884" stroke="#dfedf6" stroke-dasharray="3 7"/>
<g><animateTransform attributeName="transform" type="translate" values="65 283;750 283;65 283" dur="32s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur=".9s" repeatCount="indefinite"/>
<path d="M-19 7C-44 12-39-18-27-12" fill="none" stroke="#98bfd8" stroke-width="6" stroke-linecap="round"/>
<ellipse cx="-8" cy="8" rx="20" ry="14" fill="#cee4f3"/>
<path d="M-12-9L-10-28L1-19L13-29L17-9Z" fill="#cee4f3" stroke="#99bdd5" stroke-width="1.5"/>
<path d="M-7-21L-6-14L-1-17M10-21L6-17L12-14" fill="#efc6d1"/>
<ellipse cx="2" cy="-8" rx="17" ry="15" fill="#cee4f3"/>
<circle cx="-4" cy="-10" r="1.6" fill="#4f718a"/><circle cx="9" cy="-10" r="1.6" fill="#4f718a"/>
<path d="M1-6L4-6L2.5-3Z" fill="#d999b0"/><path d="M2.5-3Q-1 1-3-2M2.5-3Q6 1 8-2" fill="none" stroke="#63859c" stroke-width="1"/>
<ellipse cx="-8" cy="-4" rx="3" ry="1.5" fill="#efd4de"/><ellipse cx="13" cy="-4" rx="3" ry="1.5" fill="#efd4de"/>
<path d="M-17 18L-15 24M4 18L6 24" stroke="#98bfd8" stroke-width="5" stroke-linecap="round"/>
</g>
<circle cx="49" cy="15" r="8" fill="#afd8cb"/><path d="M43 10Q54 14 45 21" fill="none" stroke="#e8f7f1" stroke-width="2"/>
</g>
<text x="460" y="335" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#819fb4">little paws, steady progress.</text>
</svg>`;
await writeFile(new URL('../assets/contribution-garden.svg',import.meta.url),svg);
