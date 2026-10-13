// Builds dist/emoji.css, dist/emoji.min.css and the catalog data for the website.
// Zero dependencies: `node scripts/build.mjs`.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emojis, categories } from '../src/emojis.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const SLOTS = ['r', 't', 's', 'f', 'o', 'k', 'x', 'b'];
// Slots that need inline-block so transforms work on <span> and friends.
const TRANSFORM_SLOTS = new Set(['r', 't', 's', 'o', 'k']);
const INLINE_TAGS = 'span,a,em,strong,b,i,u,s,small,mark,code,kbd,label,abbr,q,sup,sub,img,time';

// Escapes a CSS identifier (a minimal CSS.escape).
function cssIdent(str) {
  let out = '';
  [...str].forEach((ch, i) => {
    const cp = ch.codePointAt(0);
    if (cp >= 0x80 || /[A-Za-z_-]/.test(ch) || (i > 0 && /[0-9]/.test(ch))) out += ch;
    else if (i === 0 && /[0-9]/.test(ch)) out += `\\${cp.toString(16)} `;
    else out += `\\${ch}`;
  });
  return out;
}

// Every emoji also matches without Variation Selector-16 (U+FE0F),
// because every keyboard on Earth decides on its own whether to add it.
const variants = (e) => [...new Set([e, e.replace(/️/g, '')])];
const selectorsOf = (e) => variants(e).map((v) => '.' + cssIdent(v));
const sel = (e) => selectorsOf(e).join(',');
const each = (e, fn) => selectorsOf(e).map(fn).join('\n');

const slotted = emojis.filter((d) => d.slot);
const allSel = (list) => list.flatMap((d) => selectorsOf(d.e)).join(',');

const out = [];
out.push(`/*! EmojiCSS v${pkg.version} | MIT | ${pkg.homepage}
 *  The utility-first CSS framework nobody asked for. ${emojis.length} classes, 0 dependencies.
 */`);

out.push(`\n/* ── Animation slots: each family animates a different property, so they stack ── */`);
for (const s of SLOTS) out.push(`@property --ec-${s}{syntax:"*";inherits:false}`);

out.push(`\n/* ── Composition engine ── */`);
out.push(`${allSel(slotted)}{animation:${SLOTS.map((s) => `var(--ec-${s}, none)`).join(', ')}}`);
out.push(`:where(${allSel(slotted.filter((d) => TRANSFORM_SLOTS.has(d.slot)))}):where(${INLINE_TAGS}){display:inline-block}`);

let currentCat = null;
const modifiers = [];
for (const d of emojis) {
  if (d.cat === 'mod') { modifiers.push(d); continue; }
  if (d.cat !== currentCat) {
    currentCat = d.cat;
    out.push(`\n/* ── ${categories.find((c) => c.id === d.cat).label} ── */`);
  }
  out.push(`/* ${d.e} ${d.name} */`);
  const decls = [];
  if (d.slot) decls.push(`--ec-${d.slot}:${d.anim}`);
  if (d.css) decls.push(d.css);
  if (decls.length) out.push(`${sel(d.e)}{${decls.join(';')}}`);
  if (d.raw) out.push(each(d.e, d.raw));
  if (d.rawExtra) out.push(each(d.e, d.rawExtra));
  if (d.kf) out.push(d.kf);
}

out.push(`\n/* ── Modifiers (last, so they win the cascade) ── */`);
for (const d of modifiers) {
  out.push(`/* ${d.e} ${d.name} */`);
  if (d.css) out.push(`${sel(d.e)}{${d.css}}`);
  if (d.rawExtra) out.push(each(d.e, d.rawExtra));
}

const fx = emojis.filter((d) => d.raw);
out.push(`\n/* ── The only serious part of this library: we respect prefers-reduced-motion ── */
@media (prefers-reduced-motion:reduce){
${allSel(slotted)},${fx.flatMap((d) => selectorsOf(d.e).flatMap((s) => [s + '::before', s + '::after'])).join(',')}{animation:none!important}
${sel('🖍️')}{background-size:100% 70%}
}`);

const css = out.join('\n') + '\n';

function minify(src) {
  const banner = src.match(/^\/\*![\s\S]*?\*\//)[0];
  return banner + '\n' + src
    .slice(banner.length)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim() + '\n';
}

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/emoji.css'), css);
writeFileSync(join(root, 'dist/emoji.min.css'), minify(css));

const catalog = {
  version: pkg.version,
  categories,
  emojis: emojis.map(({ e, name, cat, desc, demo = 'box', text, slot }) => ({ e, name, cat, desc, demo, text, slot })),
};
writeFileSync(join(root, 'dist/emojis.json'), JSON.stringify(catalog, null, 2) + '\n');
mkdirSync(join(root, 'site'), { recursive: true });
writeFileSync(join(root, 'site/catalog.js'), `window.EMOJICSS=${JSON.stringify(catalog)};\n`);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' kB';
console.log(`EmojiCSS v${pkg.version}: ${emojis.length} classes · emoji.css ${kb(css)} · emoji.min.css ${kb(minify(css))}`);
