// Pricing (brief 5.9). All prices and gating are PLACEHOLDERS in site.config.json.
import { config, icon, installUrl, t, esc } from '../../lib/core.mjs';
import { pageHero, sectionHead, faqList } from '../../lib/components.mjs';
import { pricingFaq } from './faq.mjs';
import { enabled } from './upcoming.mjs';

const plans = config.pricing.plans;
const cur = config.pricing.currency;
const fmt = (n) => new Intl.NumberFormat('en', { style: 'currency', currency: cur, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);
const annualMonthly = (p) => Math.round((p.monthly * (12 - config.pricing.annualMonthsFree)) / 12 * 100) / 100;

// Feature rows: [label, growth, pro, ai]. true = included, false = not included, string = shown as text.
export function featureRows() {
  const rows = [
    ['WhatsApp contacts', ...plans.map((p) => p.contacts)],
    ['All order automations', true, true, true],
    ['Abandoned cart & back-in-stock', true, true, true],
    ['Campaigns & product carousels', true, true, true],
    ['Smart audiences & Shopify segments', false, true, true],
    ['Analytics, attribution & spend', true, true, true],
    ['Quality guardian', true, true, true],
    ['AI template writer & weekly insights', true, true, true],
    ['AI assistant (suggest & auto-reply)', 'Suggest only', true, true],
    ['Merchant copilot', false, true, true],
    ['Monthly AI usage included', ...plans.map((p) => p.aiUsage)],
    ['Support', ...plans.map((p) => p.support)],
  ];
  // Upcoming features add their rows only when their flag is on.
  for (const f of enabled()) rows.splice(rows.length - 2, 0, [f.pricingRow.label, ...f.pricingRow.values]);
  return rows;
}

const cell = (v) => (v === true ? `<span class="yes">${icon('check')}<span class="sr-only">Included</span></span>`
  : v === false ? `<span class="no">${icon('minus')}<span class="sr-only">Not included</span></span>` : esc(v));

export default function pricing() {
  const rows = featureRows();
  const planCards = plans.map((p, i) => {
    const included = rows.filter((r) => r[i + 1] === true).map((r) => r[0]);
    const extra = rows.filter((r) => typeof r[i + 1] === 'string' && r[0] !== 'WhatsApp contacts' && r[0] !== 'Support' && r[0] !== 'Monthly AI usage included').map((r) => `${r[0].replace(/ \(.*\)/, '')}: ${r[i + 1].toLowerCase()}`);
    const missing = rows.filter((r) => r[i + 1] === false).map((r) => r[0]);
    const annualPm = annualMonthly(p);
    return `<article class="card plan${p.popular ? ' plan--popular' : ''} reveal">
      ${p.popular ? '<span class="pill">Most popular</span>' : ''}
      <h2 class="plan__name">${p.name}</h2>
      <p class="plan__for">${p.for}</p>
      <div class="plan__price"><span data-price-monthly="${fmt(p.monthly)}" data-price-annual="${fmt(annualPm)}">${fmt(p.monthly)}</span><small> / month</small></div>
      <p class="plan__billed" data-billed-monthly="Billed monthly" data-billed-annual="${fmt(annualPm * 12)} billed yearly">Billed monthly</p>
      <a class="btn ${p.popular ? 'btn--primary' : 'btn--secondary'} btn--block" href="${installUrl('pricing-' + p.id)}" data-event="install_click" rel="noopener">Start free trial</a>
      <ul class="checklist">
        <li>${icon('users')}<span>${p.contacts} WhatsApp contacts</span></li>
        ${included.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}
        ${extra.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}
        <li>${icon('sparkles')}<span>${p.aiUsage} monthly AI usage</span></li>
        <li>${icon('life-buoy')}<span>${p.support} support</span></li>
        ${missing.map((x) => `<li class="no">${icon('minus')}<span><span class="sr-only">Not included: </span>${x}</span></li>`).join('')}
      </ul>
    </article>`;
  }).join('');

  const table = `<div class="compare compare-desktop"><div class="table-wrap reveal"><table>
    <caption class="sr-only">Compare plans</caption>
    <thead><tr><th scope="col">Compare plans</th>${plans.map((p) => `<th scope="col">${p.name}${p.popular ? ' <span class="pill pill--soft">Most popular</span>' : ''}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><th scope="row">Price</th>${plans.map((p) => `<td class="tabular"><span data-price-monthly="${fmt(p.monthly)} / month" data-price-annual="${fmt(annualMonthly(p))} / month">${fmt(p.monthly)} / month</span></td>`).join('')}</tr>
      <tr><th scope="row">For</th>${plans.map((p) => `<td>${p.for}</td>`).join('')}</tr>
      ${rows.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((v) => `<td>${cell(v)}</td>`).join('')}</tr>`).join('')}
    </tbody></table></div></div>
  <div class="compare-mobile">${plans.map((p, i) => `<details class="reveal"><summary>Everything in ${p.name} ${icon('chevron-down')}</summary><dl>${rows.map((r) => `<dt>${r[0]}</dt><dd>${cell(r[i + 1])}</dd>`).join('')}</dl></details>`).join('')}</div>`;

  const faqs = pricingFaq(config);
  const body = `${pageHero({ trail: [['Pricing', '/pricing']], title: 'Simple plans. No per-message fees from us.', intro: `Try any plan free for ${config.trial.days} days. Cancel from Shopify at any time.`, actions: false, center: true })}
<section class="section" style="padding-top:2rem"><div class="container">
  <div style="display:flex;flex-direction:column;align-items:center;gap:.75rem">
    <div class="billing-toggle" role="group" aria-label="Billing period" data-billing-toggle hidden>
      <button type="button" data-billing="monthly" aria-pressed="true">Monthly</button>
      <button type="button" data-billing="annual" aria-pressed="false">Annual <span class="pill pill--new">${config.pricing.annualMonthsFree} months free</span></button>
    </div>
    <p class="small muted" style="text-align:center;margin:0">Prices in ${cur}. Billed through Shopify in your store’s billing currency.</p>
  </div>
  <div class="plans">${planCards}</div>
  ${table}
</div></section>
<section class="section section--alt"><div class="container"><div class="grid grid-2">
  <div class="card reveal"><span class="card__icon">${icon('receipt-text')}</span><h2 style="font-size:1.5rem">WhatsApp message fees</h2><p>Meta charges for some WhatsApp messages (for example marketing and utility templates) at rates that vary by country. These are billed by Meta to your WhatsApp Business account, not by Selo. Selo shows you an estimate before every campaign and tracks your spend.</p></div>
  <div class="card reveal"><span class="card__icon">${icon('calendar')}</span><h2 style="font-size:1.5rem">Free trial</h2><p>Try any plan free for ${config.trial.days} days. Cancel from Shopify at any time.</p></div>
</div></div></section>
<section class="section"><div class="container" style="max-width:860px">
  ${sectionHead({ title: 'Pricing questions' })}
  ${faqList(faqs)}
</div></section>`;
  return {
    route: '/pricing', title: 'Pricing: Selo for Shopify',
    description: `Plans from ${fmt(plans[0].monthly)} a month with a ${config.trial.days}-day free trial. No per-message fees from Selo; WhatsApp message fees are billed by Meta.`,
    ogTitle: 'Plans for every stage', body, trail: [['Pricing', '/pricing']], faqSchema: faqs, softwareApp: true, priority: 0.9,
  };
}
