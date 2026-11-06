// Core helpers: config (with env overrides), feature flags, links, icons, escaping.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const ROOT = root;

const raw = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));

// Feature flags: env SITE_FEATURES_<SNAKE_CASE>=true|false overrides the config file.
const snake = (s) => s.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
for (const key of Object.keys(raw.features)) {
  const v = process.env[`SITE_FEATURES_${snake(key)}`];
  if (v !== undefined) raw.features[key] = v === 'true' || v === '1';
}
if (process.env.SITE_FEATURES_ALL !== undefined) {
  for (const key of Object.keys(raw.features)) raw.features[key] = process.env.SITE_FEATURES_ALL === 'true';
}
if (process.env.FORM_ENDPOINT) raw.forms.endpoint = process.env.FORM_ENDPOINT;
if (process.env.SITE_URL) raw.company.website = process.env.SITE_URL.replace(/\/$/, '');

export const config = raw;
export const flags = raw.features;
export const brand = raw.brand;
export const company = raw.company;

// LINK_MODE=clean (default, for a real static host: /features/copilot/)
// LINK_MODE=files (for file previews: relative paths ending in index.html)
export const LINK_MODE = process.env.LINK_MODE === 'files' ? 'files' : 'clean';

let currentRoute = '/';
export const setRoute = (r) => { currentRoute = r; };
export const getRoute = () => currentRoute;

const depth = (route) => (route === '/' || route === '/404' ? 0 : route.split('/').filter(Boolean).length);

/** Link to a site route ("/", "/pricing", "/faq#ai"). */
export function href(target) {
  const [path, hash] = target.split('#');
  const h = hash ? `#${hash}` : '';
  if (LINK_MODE === 'clean') return (path === '/' ? '/' : `${path}/`) + h;
  const prefix = '../'.repeat(depth(currentRoute));
  const file = path === '/' ? 'index.html' : path === '/404' ? '404.html' : `${path.slice(1)}/index.html`;
  return prefix + file + h;
}

/** Link to a static asset ("assets/styles.css"). */
export function asset(p) {
  if (LINK_MODE === 'clean') return `/${p}`;
  return '../'.repeat(depth(currentRoute)) + p;
}

export const absUrl = (route) => company.website + (route === '/' ? '/' : `${route}/`);

/** Install link with per-page UTM parameters. */
export function installUrl(campaign) {
  const c = campaign || (currentRoute === '/' ? 'home' : currentRoute.slice(1).replace(/\//g, '-'));
  return `${company.appListing}?utm_source=website&utm_medium=cta&utm_campaign=${encodeURIComponent(c)}`;
}

export const waUrl = (text = `Hi ${brand.name}, I have a question`) =>
  `https://wa.me/${company.phones.whatsappDigits}?text=${encodeURIComponent(text)}`;

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Join arrays and drop falsy values so `${cond && x}` templates stay clean. */
export const j = (arr) => (Array.isArray(arr) ? arr.filter((x) => x !== false && x != null && x !== '').join('') : arr || '');

// Lucide line icons, inlined as SVG.
const iconDir = join(root, 'node_modules', 'lucide-static', 'icons');
const iconCache = new Map();
export function icon(name, cls = 'icon', size = 24) {
  if (!iconCache.has(name)) {
    const file = join(iconDir, `${name}.svg`);
    if (!existsSync(file)) throw new Error(`Unknown icon: ${name}`);
    const svg = readFileSync(file, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s*class="[^"]*"/, '')
      .replace(/width="24"/, 'width="__S__"').replace(/height="24"/, 'height="__S__"')
      .replace('<svg', '<svg aria-hidden="true" focusable="false" class="__C__"')
      .replace(/\n\s*/g, '');
    iconCache.set(name, svg);
  }
  return iconCache.get(name).replace(/__S__/g, size).replace('__C__', cls);
}

/** Money shown in mockups: rendered server-side, re-formatted in the visitor's locale by main.js. */
export function money(amount, currency = 'USD', opts = {}) {
  const digits = currency === 'JPY' || currency === 'KES' ? 0 : (opts.digits ?? 2);
  const text = new Intl.NumberFormat('en', { style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits, currencyDisplay: opts.display || 'symbol' }).format(amount);
  return `<span data-money="${amount}" data-currency="${currency}" data-digits="${digits}"${opts.display ? ` data-display="${opts.display}"` : ''}>${text}</span>`;
}
export function num(n) {
  return `<span data-num="${n}">${new Intl.NumberFormat('en').format(n)}</span>`;
}

export const ui = JSON.parse(readFileSync(join(root, 'src', 'i18n', 'en.json'), 'utf8'));
/** UI string lookup with {placeholders}. */
export function t(key, vars = {}) {
  const v = key.split('.').reduce((o, k) => (o ? o[k] : undefined), ui);
  if (v === undefined) throw new Error(`Missing string ${key}`);
  return String(v).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? brand[k] ?? `{${k}}`));
}
