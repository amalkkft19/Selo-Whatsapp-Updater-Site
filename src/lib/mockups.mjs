// Chat phone mockups and simplified product UI mockups. All HTML/CSS, never images,
// so text stays readable, translatable and accessible. Data is fictional sample data.
import { icon, esc, j, money, num, t } from './core.mjs';

const tagIcons = { Template: 'file-text', 'AI reply': 'sparkles', Copilot: 'bar-chart-3', Store: 'store' };

function bubble(m) {
  if (m.system) return `<li class="chat__system">${m.system}</li>`;
  const side = m.side === 'in' ? 'in' : 'out';
  const who = side === 'in' ? (m.whoLabel || 'Customer') : (m.tag ? `${m.whoLabel || 'Store'}, ${m.tag}` : (m.whoLabel || 'Store'));
  const parts = [];
  if (m.tag) parts.push(`<span class="bubble__tag">${icon(tagIcons[m.tag] || 'store')} ${esc(m.tag)}</span>`);
  if (m.photo) parts.push(`<div class="photo-thumb" role="img" aria-label="${esc(m.photo)}">${icon('image')}</div>`);
  if (m.voice) {
    const heights = [6, 12, 18, 10, 22, 14, 8, 16, 20, 12, 6, 14, 18, 10, 8, 16, 12, 6, 10, 14];
    parts.push(`<div class="voice" role="img" aria-label="Voice note, ${esc(m.voice.dur)}"><span class="voice__play">${icon('play')}</span><span class="voice__wave">${heights.map((h) => `<i style="height:${h}px"></i>`).join('')}</span><span class="voice__dur">${esc(m.voice.dur)}</span></div>`);
    if (m.voice.transcript) parts.push(`<div class="transcript"><span class="sr-only">Transcript: </span>“${esc(m.voice.transcript)}”</div>`);
  }
  if (m.text) parts.push(m.text.split('\n').map((p) => `<p>${p}</p>`).join(''));
  if (m.carousel) {
    parts.push(`<div class="carousel" role="list" aria-label="Product cards">${m.carousel.map((c) =>
      `<div class="pcard" role="listitem"><div class="pcard__img" style="background:${c.bg}">${icon(c.icon)}</div><div class="pcard__body"><span class="pcard__name">${esc(c.name)}</span><span class="pcard__price">${c.price}</span></div><span class="pcard__btn">Buy now</span></div>`).join('')}</div>`);
  }
  const meta = `<div class="bubble__meta"><time data-time="${m.time || '09:41'}">${fmtTime(m.time || '09:41')}</time>${side === 'out' && m.ticks !== false ? `${icon('check-check')}<span class="sr-only">Read</span>` : ''}</div>`;
  let buttons = '';
  if (m.buttons) {
    buttons = `<div class="bubble__buttons">${m.buttons.map((b) => {
      const o = typeof b === 'string' ? { label: b } : b;
      return `<span class="${o.tapped ? 'tapped' : ''}">${o.icon ? icon(o.icon) : ''}${esc(o.label)}${o.tapped ? '<span class="sr-only"> (tapped)</span>' : ''}</span>`;
    }).join('')}</div>`;
  }
  return `<li class="msg msg--${side}"><span class="sr-only">${esc(who)}: </span><div class="bubble">${parts.join('')}${meta}</div>${buttons}</li>`;
}

function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** Phone frame with a conversation. */
export function phone({ title = 'Northwind Apparel', subtitle = 'Business account', avatar, messages, label, animate = true, copilot = false }) {
  const av = avatar || (copilot ? icon('bar-chart-3') : esc(title.split(' ').filter((w) => /^[A-Za-z]/.test(w)).map((w) => w[0]).join('').slice(0, 2)));
  return `<figure class="phone" aria-label="${esc(label || t('common.chatPreview'))}">
  <div class="phone__screen">
    <div class="phone__bar"><span class="phone__avatar" aria-hidden="true">${av}</span><div><div class="phone__title">${esc(title)}</div><div class="phone__subtitle">${esc(subtitle)}</div></div></div>
    <ol class="chat"${animate ? ' data-animate' : ''}>${messages.map(bubble).join('')}</ol>
  </div>
  <figcaption class="sr-only">${esc(label || t('common.chatPreview'))}. Fictional example.</figcaption>
</figure>`;
}

// ---------- Product UI mockups (sample data from brief section 9) ----------
const wrap = (title, label, body, aria) =>
  `<figure class="mock" aria-label="${esc(aria || title)}"><div class="mock__head"><span class="mock__title">${esc(title)}</span><span class="pill pill--sample">${esc(label || 'Sample data')}</span></div>${body}<figcaption class="sr-only">${t('common.productPreview')}</figcaption></figure>`;

export function dashboardMock() {
  return wrap('Home · last 30 days', 'Sample data', `<div class="mock-kpis">
    <div class="kpi"><span class="kpi__label">Revenue from WhatsApp</span><span class="kpi__value">${money(12480, 'USD', { digits: 0 })}</span><span class="kpi__delta">+18% vs previous 30 days</span></div>
    <div class="kpi"><span class="kpi__label">Orders from WhatsApp</span><span class="kpi__value">${num(214)}</span></div>
    <div class="kpi"><span class="kpi__label">Messages sent</span><span class="kpi__value">${num(9860)}</span></div>
    <div class="kpi"><span class="kpi__label">Estimated message cost</span><span class="kpi__value">${money(142.3, 'USD')}</span></div>
  </div>`, 'Dashboard preview: revenue from WhatsApp $12,480 in the last 30 days, sample data');
}

export function revenueCard() {
  return `<div class="float-card" aria-label="Sample dashboard card"><div class="kpi"><span class="kpi__label">Revenue from WhatsApp · last 30 days</span><span class="kpi__value">${money(12480, 'USD', { digits: 0 })}</span><span class="kpi__delta">+18%</span> <span class="pill pill--sample" style="margin-top:.35rem">Sample data</span></div></div>`;
}

const funnelRows = [
  ['Sent', 4200], ['Delivered', 4050], ['Read', 3610], ['Clicked', 920], ['Added to cart', 310], ['Ordered', 128],
];
export function funnelMock(title = 'Campaign · New arrivals') {
  const max = funnelRows[0][1];
  return wrap(title, 'Sample data', `<div class="funnel">${funnelRows.map(([l, v]) =>
    `<div class="funnel__row"><span>${l}</span><span class="funnel__bar"><i style="width:${Math.max(3, (v / max) * 100).toFixed(1)}%"></i></span><span class="funnel__val">${num(v)}</span></div>`).join('')}</div>
    <div class="mock-foot"><span>Revenue <strong>${money(6940, 'USD', { digits: 0 })}</strong></span><span>Cost <strong>${money(58.8, 'USD')}</strong></span><span>Return on spend <strong>118×</strong></span></div>`,
  'Campaign funnel preview: sent 4,200, delivered 4,050, read 3,610, clicked 920, added to cart 310, ordered 128; revenue $6,940, cost $58.80. Sample data');
}

export function automationFunnelMock() {
  const rows = [['Sent', 1280], ['Delivered', 1251], ['Read', 1104], ['Clicked', 402], ['Ordered', 96]];
  return wrap('Automation · Abandoned checkout', 'Sample data', `<div class="funnel">${rows.map(([l, v]) =>
    `<div class="funnel__row"><span>${l}</span><span class="funnel__bar"><i style="width:${((v / 1280) * 100).toFixed(1)}%"></i></span><span class="funnel__val">${num(v)}</span></div>`).join('')}</div>
    <div class="mock-foot"><span>Revenue credited <strong>${money(5210, 'EUR', { digits: 0 })}</strong></span><span>Last 30 days</span></div>`,
  'Automation funnel preview with sample data');
}

export function composeMock() {
  return wrap('New campaign', 'Sample data', `
    <div class="field-mock"><span>Type</span><b>Discount coupon</b></div>
    <div class="field-mock"><span>Template</span><b>spring_sale_offer · Approved</b></div>
    <span class="mock__label">Audience</span>
    <div class="seg"><span>All opted-in</span><span class="on">Abandoned carts</span><span>Waiting for a product</span><span>Repeat buyers who stopped</span><span>Shopify segment</span></div>
    <div class="field-mock"><span>Discount code</span><b>SPRING15 · 15% off · created in Shopify</b></div>
    <div class="mock-foot"><span>Recipients <strong>${num(1842)}</strong></span><span>Estimated cost <strong>${money(25.79, 'GBP')}</strong></span><span>Send <strong>Fri, 10:00 AM store time</strong></span></div>`,
  'Campaign compose preview: discount coupon to the abandoned carts audience, 1,842 recipients, estimated cost £25.79. Sample data');
}

export function inboxMock() {
  const rows = [
    ['Priya', 'Where is my order #1052?', '<span class="badge badge--ai">AI replied</span>'],
    ['Lucas', 'The zip on my bag is broken', '<span class="badge badge--handoff">Needs your team</span>'],
    ['Mei', 'Do you ship to Singapore?', '<span class="badge badge--ai">AI draft</span>'],
    ['Kwame', 'Thanks, got it!', ''],
  ];
  return wrap('Inbox', 'Sample data', `<div class="inbox">${rows.map(([n, s, b]) =>
    `<div class="inbox__row"><span class="phone__avatar" aria-hidden="true">${n[0]}</span><div><b>${n}</b><span class="snip">${s}</span></div>${b}</div>`).join('')}</div>`, 'Inbox preview with AI replies, drafts and a handover. Sample data');
}

export function spendMock() {
  const vals = [32, 41, 28, 55, 47, 60, 38, 44, 70, 52, 48, 65, 58, 74];
  return wrap('Spend · last 14 days', 'Sample data', `<div class="bars" aria-hidden="true">${vals.map((v, i) => `<i style="height:${v}%"${i === 8 ? ' class="acc"' : ''}></i>`).join('')}</div>
    <div class="axis" aria-hidden="true"><span>Nov 1</span><span>Nov 7</span><span>Nov 14</span></div>
    <div class="mock-foot"><span>Marketing <strong>${money(98.4, 'EUR')}</strong></span><span>Utility <strong>${money(31.2, 'EUR')}</strong></span><span>Top market <strong>Germany</strong></span></div>`,
  'Spend chart preview: message costs by day, marketing €98.40 and utility €31.20. Sample data');
}

export function qualityMock() {
  return wrap('Quality guardian', 'Sample data', `
    <div class="gauge"><span class="gauge__dot" aria-hidden="true"></span><div><b>Number quality: High</b><br><span class="mock__label">Messaging limit: 10,000 customers / 24 h</span></div></div>
    <div class="field-mock"><span>Frequency cap</span><b>2 marketing messages per customer per 7 days</b></div>
    <div class="field-mock"><span>Last campaign</span><b>Opt-outs 0.4% · 23 skipped by frequency cap</b></div>
    <div class="alert-mock">${icon('triangle-alert')}<span><b>Heads up:</b> opt-outs after “Weekend sale” were higher than usual. Consider a smaller audience next time.</span></div>`,
  'Quality guardian preview: number quality high, frequency cap and an opt-out alert. Sample data');
}

export function riskListMock() {
  const rows = [['#2207', 'Amara · KES 4,500', 'low', 'Low'], ['#2208', 'Omar · KES 12,900', 'high', 'High'], ['#2209', 'Elena · KES 2,100', 'med', 'Medium']];
  return wrap('Cash-on-delivery orders', 'Sample data', `<div class="inbox">${rows.map(([o, d, c, l]) =>
    `<div class="inbox__row"><div><b>${o}</b><span class="snip">${d}</span></div><span class="badge badge--${c}">${l} risk</span></div>`).join('')}</div>`, 'Order list with COD risk badges. Sample data');
}
