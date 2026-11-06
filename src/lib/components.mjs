// Shared page components: shell, header, footer, CTA band, cookie banner, cards, FAQ.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, config, brand, company, flags, href, asset, installUrl, waUrl, esc, j, icon, t, getRoute, absUrl } from './core.mjs';

const markSvg = readFileSync(join(ROOT, 'src/assets/brand/selo-mark.svg'), 'utf8')
  .replace('role="img" aria-label="Selo"', 'aria-hidden="true" focusable="false"');

export const logo = (cls = 'logo') =>
  `<a class="${cls}" href="${href('/')}" aria-label="${esc(t('nav.home'))}">${markSvg}<span>${esc(brand.name)}</span></a>`;

const featureNav = [
  ['automations', '/features/automations', 'zap'],
  ['campaigns', '/features/campaigns', 'megaphone'],
  ['aiAssistant', '/features/ai-assistant', 'bot-message-square'],
  ['copilot', '/features/copilot', 'smartphone'],
  ['analytics', '/features/analytics', 'chart-column'],
  ['quality', '/features/quality', 'shield-check'],
];
const resourceNav = [
  ['useCases', '/use-cases', 'layout-grid'],
  ['customers', '/customers', 'users'],
  ['faq', '/faq', 'circle-help'],
  ['changelog', '/changelog', 'newspaper'],
  ['blog', '/blog', 'book-open'],
  ['security', '/security', 'lock'],
];
// en.json stores each nav item as [label, description]
const items = JSON.parse(readFileSync(join(ROOT, 'src/i18n/en.json'), 'utf8')).nav.items;

const cur = (route) => (getRoute() === route || getRoute().startsWith(route + '/') ? ' aria-current="page"' : '');

export function header() {
  const ann = config.announcement.enabled
    ? `<aside class="announce" aria-label="Announcement" data-announce="${esc(config.announcement.id)}"><div class="container"><span class="pill pill--new">${t('common.new')}</span><a href="${href(config.announcement.route)}">${esc(config.announcement.text.replace(/^New:\s*/, '').replace(/^./, (c) => c.toUpperCase()))} <span aria-hidden="true">→</span></a><button class="announce__close" type="button" aria-label="${t('announcement.dismiss')}" hidden>${icon('x')}</button></div></aside>`
    : '';
  const featItems = featureNav.map(([k, r, ic]) =>
    `<a class="dd__item" href="${href(r)}"${cur(r)}>${icon(ic)}<span><strong>${items[k][0]}</strong><span>${items[k][1]}</span></span></a>`).join('');
  const resItems = resourceNav.map(([k, r, ic]) =>
    `<a class="dd__item" href="${href(r)}"${cur(r)}>${icon(ic)}<span><strong>${items[k][0]}</strong></span></a>`).join('');
  const chevron = icon('chevron-down');
  const install = `<a class="btn btn--primary btn--sm" href="${installUrl()}" data-event="install_click" rel="noopener">${t('nav.install')}</a>`;
  const demo = `<a class="btn btn--secondary btn--sm" href="${href('/contact#demo')}" data-event="demo_click">${t('nav.bookDemo')}</a>`;
  return `${ann}<header class="site-header" id="top">
  <div class="container">
    ${logo()}
    <nav class="nav-desktop" aria-label="Main">
      <details class="dd"><summary>${t('nav.features')} ${chevron}</summary>
        <div class="dd__panel">${featItems}<a class="dd__item dd__all" href="${href('/features')}"><span><strong>${t('nav.allFeatures')} →</strong></span></a></div>
      </details>
      <a class="nav-link" href="${href('/pricing')}"${cur('/pricing')}>${t('nav.pricing')}</a>
      <a class="nav-link" href="${href('/how-it-works')}"${cur('/how-it-works')}>${t('nav.howItWorks')}</a>
      <details class="dd"><summary>${t('nav.resources')} ${chevron}</summary>
        <div class="dd__panel dd__panel--narrow">${resItems}</div>
      </details>
      <a class="nav-link" href="${href('/contact')}"${cur('/contact')}>${t('nav.contact')}</a>
    </nav>
    <div class="header-actions">${demo}${install}</div>
    <details class="mnav">
      <summary aria-label="${t('nav.menu')}"><span class="icon-open">${icon('menu')}</span><span class="icon-close">${icon('x')}</span></summary>
      <div class="mnav__panel" role="dialog" aria-label="${t('nav.menu')}">
        <nav class="mnav__scroll" aria-label="Mobile">
          <details class="mnav__group"><summary>${t('nav.features')} ${chevron}</summary>
            <ul class="mnav__sub">${featureNav.map(([k, r, ic]) => `<li><a href="${href(r)}"${cur(r)}>${icon(ic)}${items[k][0]}</a></li>`).join('')}<li><a href="${href('/features')}">${icon('layout-grid')}${t('nav.allFeatures')}</a></li></ul>
          </details>
          <a class="mnav__link" href="${href('/pricing')}"${cur('/pricing')}>${t('nav.pricing')}</a>
          <a class="mnav__link" href="${href('/how-it-works')}"${cur('/how-it-works')}>${t('nav.howItWorks')}</a>
          <details class="mnav__group"><summary>${t('nav.resources')} ${chevron}</summary>
            <ul class="mnav__sub">${resourceNav.map(([k, r, ic]) => `<li><a href="${href(r)}"${cur(r)}>${icon(ic)}${items[k][0]}</a></li>`).join('')}</ul>
          </details>
          <a class="mnav__link" href="${href('/contact')}"${cur('/contact')}>${t('nav.contact')}</a>
        </nav>
        <div class="mnav__actions">
          <a class="btn btn--secondary" href="${href('/contact#demo')}" data-event="demo_click">${t('nav.bookDemo')}</a>
          <a class="btn btn--primary" href="${installUrl()}" data-event="install_click" rel="noopener">${t('nav.install')}</a>
        </div>
      </div>
    </details>
  </div>
</header>`;
}

const socialIcons = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4z"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.3V8.7L15.5 12z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
};
const networkNames = { linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube', instagram: 'Instagram' };

export function footer() {
  const L = (r, text) => `<li><a href="${href(r)}">${text}</a></li>`;
  const E = (url, text) => `<li><a href="${url}" rel="noopener">${text}</a></li>`;
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div>
        ${logo()}
        <p class="muted" style="margin-top:.75rem">${t('footer.tagline')}</p>
        <ul class="social">${Object.entries(company.social).map(([k, url]) =>
          `<li><a href="${url}" rel="noopener" aria-label="${esc(t('footer.social', { network: networkNames[k] }))}">${socialIcons[k]}</a></li>`).join('')}</ul>
      </div>
      <div class="footer-cols">
        <div><h2>${t('footer.product')}</h2><ul>
          ${L('/features', t('footer.features'))}${L('/features/automations', items.automations[0])}${L('/features/campaigns', items.campaigns[0])}${L('/features/ai-assistant', items.aiAssistant[0])}${L('/features/copilot', items.copilot[0])}${L('/features/analytics', items.analytics[0])}${L('/pricing', t('nav.pricing'))}${L('/changelog', items.changelog[0])}
        </ul></div>
        <div><h2>${t('footer.resources')}</h2><ul>
          ${L('/how-it-works', t('nav.howItWorks'))}${L('/use-cases', items.useCases[0])}${L('/customers', items.customers[0])}${L('/faq', items.faq[0])}${L('/blog', items.blog[0])}${E(company.helpCentre, t('footer.helpCentre'))}
        </ul></div>
        <div><h2>${t('footer.company')}</h2><ul>
          ${L('/about', t('footer.about'))}${L('/contact', t('nav.contact'))}${L('/careers', t('footer.careers'))}${L('/press', t('footer.pressKit'))}
        </ul></div>
        <div><h2>${t('footer.legal')}</h2><ul>
          ${L('/legal/privacy', t('footer.privacy'))}${L('/legal/terms', t('footer.terms'))}${L('/legal/dpa', t('footer.dpa'))}${L('/legal/cookies', t('footer.cookies'))}${L('/legal/acceptable-use', t('footer.acceptableUse'))}${L('/security', items.security[0])}
        </ul></div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-controls">
        <label class="select-inline"><span>${icon('languages', 'icon', 18)}<span class="sr-only">${t('footer.language')}</span></span>
          <select data-lang-select aria-label="${t('footer.language')}"><option value="en" selected>English</option></select></label>
        <div class="theme-toggle" role="group" aria-label="${t('footer.theme')}" data-theme-toggle>
          <button type="button" data-theme-value="auto" aria-pressed="true">${icon('monitor')}<span>${t('footer.themeAuto')}</span></button>
          <button type="button" data-theme-value="light" aria-pressed="false">${icon('sun')}<span>${t('footer.themeLight')}</span></button>
          <button type="button" data-theme-value="dark" aria-pressed="false">${icon('moon')}<span>${t('footer.themeDark')}</span></button>
        </div>
        <button type="button" class="linklike" data-cookie-open>${t('footer.cookieSettings')}</button>
      </div>
      <p>© ${new Date().getFullYear()} ${esc(company.legalName)}. ${t('footer.rights')}</p>
      <p>${esc(t('footer.trademark'))}</p>
    </div>
  </div>
</footer>`;
}

export function ctaBand() {
  const fine = [t('cta.trial', { days: config.trial.days }), config.trial.noCardToStart && t('cta.noCard'), t('cta.fees')].filter(Boolean).join(' · ');
  return `<section class="cta-band" aria-labelledby="cta-h"><div class="container"><div class="cta-band__box reveal">
  <h2 id="cta-h">${t('cta.heading')}</h2>
  <p>${esc(t('cta.text'))}</p>
  <div class="btn-row btn-row--stack-mobile">
    <a class="btn btn--primary" href="${installUrl()}" data-event="install_click" rel="noopener">${t('nav.install')}</a>
    <a class="btn btn--secondary" href="${href('/contact#demo')}" data-event="demo_click">${t('nav.bookDemo')}</a>
  </div>
  <p class="fineprint">${fine}</p>
</div></div></section>`;
}

export function cookieBanner() {
  return `<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-h" data-cookie hidden>
  <h2 id="cookie-h">${t('cookie.title')}</h2>
  <p>${t('cookie.text')} <a href="${href('/legal/cookies')}">${t('cookie.policy')}</a>.</p>
  <form data-cookie-form hidden>
    <fieldset>
      <legend class="sr-only">${t('cookie.settings')}</legend>
      <label class="check"><input type="checkbox" checked disabled><span><strong>${t('cookie.necessary')}</strong><span>${t('cookie.necessaryText')}</span></span></label>
      <label class="check"><input type="checkbox" name="analytics"><span><strong>${t('cookie.analytics')}</strong><span>${t('cookie.analyticsText')}</span></span></label>
      <label class="check"><input type="checkbox" name="marketing"><span><strong>${t('cookie.marketing')}</strong><span>${t('cookie.marketingText')}</span></span></label>
    </fieldset>
    <div class="btn-row"><button class="btn btn--primary btn--sm" type="submit">${t('cookie.save')}</button></div>
  </form>
  <div class="btn-row" data-cookie-actions>
    <button class="btn btn--primary btn--sm" type="button" data-cookie-accept>${t('cookie.acceptAll')}</button>
    <button class="btn btn--secondary btn--sm" type="button" data-cookie-reject>${t('cookie.reject')}</button>
    <button class="btn btn--secondary btn--sm" type="button" data-cookie-settings>${t('cookie.settings')}</button>
  </div>
</div>`;
}

// ---------- Small building blocks ----------
export const arrow = () => icon('arrow-right');
export const more = (route, text = t('common.learnMore')) => `<a class="btn btn--tertiary" href="${href(route)}">${text} ${arrow()}</a>`;

export function card({ ic, title, text, link, linkText, bullets, pill, tag = 'h3' }) {
  return `<article class="card reveal">${ic ? `<span class="card__icon">${icon(ic)}</span>` : ''}${pill || ''}<${tag}>${title}</${tag}>${text ? `<p>${text}</p>` : ''}${bullets ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : ''}${link ? more(link, linkText || `${t('common.learnMore')}<span class="sr-only"> about ${title.replace(/<[^>]+>/g, '')}</span>`) : ''}</article>`;
}

export function sectionHead({ eyebrow, title, text, center = false, id, level = 'h2' }) {
  return `<div class="section-head${center ? ' section-head--center' : ''}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${level}${id ? ` id="${id}"` : ''}>${title}</${level}>${text ? `<p>${text}</p>` : ''}</div>`;
}

export function crumbs(trail) {
  // trail: [[label, route], ...] last is current
  return `<nav class="crumbs" aria-label="${t('common.breadcrumb')}"><ol><li><a href="${href('/')}">Home</a></li>${trail.map(([l, r], i) =>
    i === trail.length - 1 ? `<li><span aria-current="page">${l}</span></li>` : `<li><a href="${href(r)}">${l}</a></li>`).join('')}</ol></nav>`;
}

export function pageHero({ trail, eyebrow, title, intro, pill, center = false, actions = true }) {
  return `<section class="page-hero${center ? ' page-hero--center' : ''}"><div class="container">
  ${trail ? crumbs(trail) : ''}
  ${pill || eyebrow ? `<p class="eyebrow">${pill || ''}${eyebrow || ''}</p>` : ''}
  <h1>${title}</h1>
  ${intro ? `<p>${intro}</p>` : ''}
  ${actions ? `<div class="btn-row btn-row--stack-mobile" style="margin-top:1.5rem"><a class="btn btn--primary" href="${installUrl()}" data-event="install_click" rel="noopener">${t('nav.install')}</a><a class="btn btn--secondary" href="${href('/contact#demo')}" data-event="demo_click">${t('nav.bookDemo')}</a></div>` : ''}
</div></section>`;
}

export function checklist(list) {
  return `<ul class="checklist">${list.map((x) => `<li>${icon('circle-check')}<span>${x}</span></li>`).join('')}</ul>`;
}

/** FAQ accordion. groups: [{id, title, items:[{q, a}]}] */
export function faqList(itemsList) {
  return `<div class="faq">${itemsList.map((f) => `<details><summary>${f.q}${icon('plus')}</summary><div class="answer"><p>${f.a}</p></div></details>`).join('')}</div>`;
}

/** A content block (feature-page section) with optional visual. */
export function block({ id, title, text, bullets, checks, visual, reverse = false, extra = '', pill = '' }) {
  const body = `<div>${pill}<h2${id ? ` id="${id}"` : ''} style="font-size:clamp(1.5rem,1.2rem + 1.2vw,2rem)">${title}</h2>${text ? `<p class="lead">${text}</p>` : ''}${bullets ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : ''}${checks ? checklist(checks) : ''}${extra}</div>`;
  if (!visual) return `<div class="block reveal">${body}</div>`;
  return `<div class="block split${reverse ? ' split--reverse' : ''} reveal">${body}<div class="feature-row__visual">${visual}</div></div>`;
}

export const sampleLabel = (text = t('common.sample')) => `<span class="pill pill--sample">${text}</span>`;
