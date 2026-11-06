import { config, company, brand, href, icon, esc, waUrl, flags } from '../../lib/core.mjs';
import { pageHero, sectionHead, card, faqList, checklist, more, sampleLabel, crumbs } from '../../lib/components.mjs';
import { dashboardMock } from '../../lib/mockups.mjs';
import { scriptA, notFoundChat } from './chats.mjs';
import { faqGroups } from './faq.mjs';
import { upcoming, on, enabled } from './upcoming.mjs';
import { testimonialData } from './shared.mjs';

// ---------- /how-it-works ----------
function howItWorks() {
  const steps = [
    ['Install from the Shopify App Store', 'Add Selo to your store. It works with any Shopify plan.', 'store'],
    ['Connect your WhatsApp number', 'Click Connect WhatsApp and sign in with your Meta account. Choose an existing WhatsApp Business number or register a new one. Selo never sees your Meta password.', 'link'],
    ['Pick your messages', 'Turn on the automations you want and choose a template for each, from starters or written by the AI writer. Selo submits them to WhatsApp for approval and tells you when they’re live.', 'file-check'],
    ['Grow and measure', 'Add the chat button and back-in-stock sign-up to your theme, run your first campaign, and switch on the AI assistant when you’re ready. Your home dashboard shows what’s working.', 'chart-column'],
  ];
  const body = `${pageHero({ trail: [['How it works', '/how-it-works']], title: 'Live on WhatsApp in four steps', intro: 'No code and no developer needed. The in-app setup guide walks you through each step.' })}
<section class="section"><div class="container">
  <ol class="steps steps--long">${steps.map(([h, p, ic], i) => `<li class="reveal"><div><h2 style="font-size:1.5rem">${h}</h2><p>${p}</p></div><div class="feature-row__visual">${i === 3 ? dashboardMock() : `<div class="card__icon" style="width:96px;height:96px;border-radius:24px">${icon(ic, 'icon', 44)}</div>`}</div></li>`).join('')}</ol>
</div></section>
<section class="section section--alt"><div class="container"><div class="grid grid-2">
  <div class="card reveal"><h2 style="font-size:1.5rem">What you’ll need</h2>${checklist(['A Shopify store', 'A phone number that can receive a verification SMS or call (not one already registered on a personal WhatsApp app)', 'A Meta (Facebook) account to manage the WhatsApp Business account'])}</div>
  <div class="card reveal"><h2 style="font-size:1.5rem">Setup guide inside the app</h2><p>The in-app home page walks you through each step and shows what’s left.</p>${more('/faq#getting-started', 'Setup questions')}</div>
</div></div></section>`;
  return { route: '/how-it-works', title: 'How Selo works: live on WhatsApp in 4 steps', description: 'Install Selo from the Shopify App Store, connect your WhatsApp Business number, pick your messages, then grow and measure.', body, trail: [['How it works', '/how-it-works']], priority: 0.8, howTo: steps.map((s) => ({ name: s[0], text: s[1] })) };
}

// ---------- /use-cases ----------
function useCases() {
  const codBullets = ['COD confirmation messages before dispatch', 'Customers confirm the order and amount due', 'Unconfirmed orders are easy to spot'];
  if (on('codRiskScoring')) codBullets.push(...upcoming.codRiskScoring.useCaseBullets);
  if (on('addressFixer')) codBullets.push(...upcoming.addressFixer.useCaseBullets);
  const cases = [
    { ic: 'shopping-cart', goal: 'Recover abandoned carts', problem: 'Shoppers leave checkout and forget.', how: ['Reminder automation with a link back to the cart', 'Abandoned-cart smart audience for follow-up campaigns', 'Recovered sales counted on your dashboard'], links: [['Automations', '/features/automations'], ['Campaigns', '/features/campaigns']] },
    { ic: 'package', goal: 'Cut “Where is my order?” tickets', problem: 'Your team answers the same tracking question all day.', how: ['Shipping updates with tracking links', 'AI auto-replies with live tracking', 'Handover when something’s wrong'], links: [['Automations', '/features/automations'], ['AI assistant', '/features/ai-assistant']] },
    { ic: 'banknote', goal: 'Cash-on-delivery stores', problem: 'Unconfirmed COD orders get refused at the door.', how: codBullets, links: [['Automations', '/features/automations']] },
    { ic: 'bell', goal: 'Launches and restocks', problem: 'Interested shoppers miss the moment a product is back.', how: ['Back-in-stock sign-ups on product pages', 'One alert per restock', 'Product carousels for new arrivals'], links: [['Automations', '/features/automations'], ['Campaigns', '/features/campaigns']] },
    { ic: 'calendar', goal: 'Seasonal sales', problem: 'Black Friday, Lunar New Year, Ramadan, summer sales: busy dates, crowded inboxes.', how: ['Coupon campaigns with real Shopify codes', 'Scheduled in your store’s time zone', 'Frequency cap to avoid over-messaging'], links: [['Campaigns', '/features/campaigns'], ['Quality', '/features/quality']] },
    { ic: 'rotate-ccw', goal: 'Win back lapsed customers', problem: 'Good customers quietly stop ordering.', how: ['“Repeat buyers who stopped ordering” audience', 'Personal offers by WhatsApp', 'Results and revenue per campaign'], links: [['Campaigns', '/features/campaigns']] },
    { ic: 'users', goal: 'Small teams, many chats', problem: 'Too many messages for a few people.', how: ['AI suggestions your team can send in one click', 'Handovers for anything sensitive', 'Auto-replies outside business hours'], links: [['AI assistant', '/features/ai-assistant']] },
    { ic: 'smartphone', goal: 'Owners on the move', problem: 'You want your numbers without opening a laptop.', how: ['Copilot for daily numbers', 'Campaign drafts from a message', 'Approve with one tap'], links: [['Copilot', '/features/copilot']] },
  ];
  const types = [['shirt', 'Fashion & apparel'], ['sparkle', 'Beauty & personal care'], ['sofa', 'Home & living'], ['coffee', 'Food & beverage'], ['cpu', 'Electronics & accessories'], ['heart-pulse', 'Health & wellness']];
  const body = `${pageHero({ trail: [['Use cases', '/use-cases']], title: 'What stores use Selo for', intro: 'Pick a goal and see which features help.' })}
<section class="section"><div class="container"><div class="grid grid-2">
  ${cases.map((c) => `<article class="card reveal"><span class="card__icon">${icon(c.ic)}</span><h2 style="font-size:1.375rem">${c.goal}</h2><p><strong>The problem:</strong> ${c.problem}</p>${checklist(c.how)}<div class="btn-row" style="margin-top:auto;padding-top:.5rem">${c.links.map(([l, r]) => more(r, l)).join('')}</div></article>`).join('')}
</div></div></section>
<section class="section section--alt section--tight"><div class="container">
  ${sectionHead({ title: 'Made for every kind of store', center: true })}
  <ul class="strip">${types.map(([ic, l]) => `<li>${icon(ic)}${l}</li>`).join('')}</ul>
</div></section>`;
  return { route: '/use-cases', title: 'Use cases: WhatsApp for Shopify stores | Selo', description: 'Recover carts, cut tracking tickets, confirm cash-on-delivery orders, launch restocks, run seasonal sales and win back customers on WhatsApp.', body, trail: [['Use cases', '/use-cases']], priority: 0.7 };
}

// ---------- /customers (sample story) ----------
function customers() {
  const body = `${pageHero({ trail: [['Customer stories', '/customers']], title: 'Customer stories', intro: 'Real stories are on their way. Until then, here is a clearly labelled sample that shows how a store might use Selo.', actions: false })}
<section class="section"><div class="container" style="max-width:900px">
  <article class="card" style="padding:2rem">
    ${sampleLabel('Sample story: illustrates how a store might use Selo')}
    <h2 style="margin-top:.75rem">Northwind Apparel (fictional)</h2>
    <dl class="grid grid-3" style="margin:0 0 1rem">
      <div><dt class="muted small">Industry</dt><dd style="margin:0;font-weight:600">Fashion & apparel</dd></div>
      <div><dt class="muted small">Country</dt><dd style="margin:0;font-weight:600">Germany</dd></div>
      <div><dt class="muted small">Team size</dt><dd style="margin:0;font-weight:600">6 people</dd></div>
    </dl>
    <h3>The challenge</h3>
    <p>A small support team spent most mornings answering “where is my order?” emails, and abandoned carts were followed up by email only, with low open rates.</p>
    <h3>What they set up</h3>
    ${checklist(['Order confirmation and shipping updates on WhatsApp', 'Abandoned checkout reminders', 'The AI assistant in Suggest mode, then auto-replies for order status', 'A monthly new-arrivals carousel to opted-in customers'])}
    <h3 style="margin-top:1.5rem">Results ${sampleLabel('Illustrative')}</h3>
    <p>Fewer tracking questions reached the team, and cart reminders became a steady source of orders visible on the Selo dashboard. These results are illustrative, not measured.</p>
    <figure class="quote" style="margin-top:1rem;padding:1.25rem;border-radius:12px;background:var(--color-surface-alt)">${sampleLabel('Sample quote')}<blockquote><p>“${testimonialData[0].text}”</p></blockquote><figcaption>Sample · Owner, apparel store</figcaption></figure>
  </article>
  <p style="margin-top:2rem">Using Selo and happy to share your story? <a href="${href('/contact')}">Tell us</a>.</p>
</div></section>`;
  return { route: '/customers', title: 'Customer stories | Selo', description: 'How Shopify stores use Selo for WhatsApp. Sample story shown until real customer stories are published.', body, trail: [['Customer stories', '/customers']], priority: 0.4 };
}

// ---------- /faq ----------
function faq() {
  const groups = faqGroups();
  const body = `${pageHero({ trail: [['FAQ', '/faq']], title: 'Frequently asked questions', intro: `Can’t find your answer? <a href="${href('/contact')}">Contact us</a>.`, actions: false })}
<section class="section"><div class="container"><div class="faq-layout">
  <nav class="faq-nav" aria-label="FAQ topics">${groups.map((g) => `<a href="#${g.id}">${g.title}</a>`).join('')}</nav>
  <div>${groups.map((g) => `<section class="faq-group" aria-labelledby="${g.id}"><h2 id="${g.id}" style="font-size:1.5rem">${g.title}</h2>${faqList(g.items)}</section>`).join('')}</div>
</div></div></section>`;
  return { route: '/faq', title: 'FAQ: WhatsApp for Shopify | Selo', description: 'Answers about setup, WhatsApp Business accounts, message costs, templates, the AI assistant, privacy and billing.', body, trail: [['FAQ', '/faq']], faqSchema: groups.flatMap((g) => g.items), priority: 0.7 };
}

// ---------- /about ----------
function about() {
  const body = `${pageHero({ trail: [['About', '/about']], title: 'We help independent stores talk to their customers where they already are', actions: false })}
<section class="section"><div class="container"><div class="split">
  <div class="prose">
    <div class="placeholder-box" style="margin-bottom:1.25rem"><strong>PLACEHOLDER:</strong> founders to edit this story.</div>
    <p>WhatsApp is how billions of people talk to friends, family and the businesses they buy from. For many shoppers it is the first app they open in the morning.</p>
    <p>Independent stores deserve a simple, honest way to use it: one that respects their customers, doesn’t need a developer, and shows clearly what each message is worth.</p>
    <p>Selo was built to bring automation, campaigns and AI together in one Shopify app, with clear numbers and strong safeguards.</p>
  </div>
  <div class="feature-row__visual">${scriptA()}</div>
</div></div></section>
<section class="section section--alt"><div class="container">
  ${sectionHead({ title: 'What we believe' })}
  <div class="grid grid-4">
    ${card({ ic: 'heart-handshake', title: 'Respect the customer', text: 'Consent first, no spam.' })}
    ${card({ ic: 'scale', title: 'Honest numbers', text: 'Every result traceable.' })}
    ${card({ ic: 'shield-check', title: 'AI with guardrails', text: 'Facts from your data, people in the loop.' })}
    ${card({ ic: 'globe', title: 'Built for every store, everywhere', text: 'Any country, currency, language and time zone.' })}
  </div>
</div></section>
<section class="section"><div class="container">
  ${sectionHead({ title: 'The team', text: 'PLACEHOLDER: real names and photos will be added when supplied.' })}
  <div class="grid grid-4">${[['FC', 'Founder & CEO'], ['HP', 'Head of Product'], ['LE', 'Lead Engineer'], ['CS', 'Customer Success']].map(([i, r]) => `<article class="card reveal" style="align-items:flex-start"><span class="avatar" aria-hidden="true">${i}</span><h3>${r}</h3><p>Name to be added</p></article>`).join('')}</div>
  <h2 style="font-size:1.25rem;margin-top:3rem">Company facts</h2>
  <ul class="facts"><li>Founded ${company.founded}</li><li>Remote-first team</li><li>Customers in many countries</li></ul>
</div></section>`;
  return { route: '/about', title: 'About Selo', description: 'Selo helps independent Shopify stores talk to customers on WhatsApp with automation, campaigns and AI, backed by clear numbers and strong safeguards.', body, trail: [['About', '/about']], priority: 0.5 };
}

// ---------- /contact ----------
function countries() {
  const dn = new Intl.DisplayNames(['en'], { type: 'region', fallback: 'none' });
  const exclude = new Set(['EU', 'EZ', 'UN', 'QO', 'XA', 'XB', 'ZZ', 'AC', 'CP', 'DG', 'EA', 'IC', 'TA', 'XK', 'CQ', 'AN', 'BU', 'CS', 'DD', 'FX', 'NT', 'SU', 'TP', 'YD', 'YU', 'ZR', 'QU', 'UK']);
  const list = [];
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b);
    if (exclude.has(code)) continue;
    const name = dn.of(code);
    if (name && name !== code) list.push([code, name]);
  }
  return list.sort((x, y) => x[1].localeCompare(y[1], 'en'));
}

function contact() {
  const f = (id, labelTxt, input, { req = false, hint = '' } = {}) => `<div class="field"><label for="${id}">${labelTxt}${req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>${hint ? `<span class="field__hint" id="${id}-hint">${hint}</span>` : ''}${input}<span class="field__error" id="${id}-error" hidden></span></div>`;
  const reqAttrs = (id, what) => `required aria-required="true" data-validate aria-describedby="${id}-error" data-required-msg="Please enter ${what}."`;
  const cs = countries();
  const ep = config.forms.endpoint;
  const e = company.emails, p = company.phones, a = company.address;
  // Names are only shipped for features teased in the Coming soon strip (flag off + showComingSoon on).
  const upcomingNames = flags.showComingSoon ? Object.fromEntries(Object.values(upcoming).filter((u) => !flags[u.flag]).map((u) => [u.slug, u.name])) : {};
  const form = `<form class="form" id="contact-form" data-contact-form data-endpoint="${esc(ep)}" method="post" action="${esc(ep || '#')}"
    data-success="Thanks, we’ll reply within one business day." data-failure="Sorry, something went wrong. Please try again or email ${e.general}." data-error-summary="Please fix the highlighted fields.">
    <div class="form-row form-row--2">
      ${f('name', 'Name', `<input id="name" name="name" type="text" autocomplete="name" ${reqAttrs('name', 'your name')}>`, { req: true })}
      ${f('email', 'Work email', `<input id="email" name="email" type="email" autocomplete="email" inputmode="email" ${reqAttrs('email', 'your work email')} data-invalid-msg="Please enter a valid email address, like name@store.com.">`, { req: true })}
    </div>
    <div class="form-row form-row--2">
      ${f('store', 'Store URL', '<input id="store" name="store" type="text" inputmode="url" autocomplete="url" placeholder="yourstore.myshopify.com">')}
      ${f('country', 'Country', `<select id="country" name="country" autocomplete="country"><option value="">Select a country</option>${cs.map(([c, n]) => `<option value="${c}">${esc(n)}</option>`).join('')}</select>`)}
    </div>
    <div class="form-row form-row--2">
      ${f('topic', 'Topic', `<select id="topic" name="topic" ${reqAttrs('topic', 'a topic').replace('Please enter', 'Please choose')}><option value="">Choose a topic</option><option value="sales">Sales question</option><option value="demo">Book a demo</option><option value="support">Support</option><option value="partnerships">Partnerships</option><option value="press">Press</option><option value="other">Other</option></select>`, { req: true })}
      ${f('orders', 'Approximate monthly orders', '<select id="orders" name="orders"><option value="">Select</option><option>Under 100</option><option>100 to 1,000</option><option>1,000 to 10,000</option><option>10,000+</option></select>')}
    </div>
    ${f('message', 'Message', `<textarea id="message" name="message" rows="5" ${reqAttrs('message', 'a message')}></textarea>`, { req: true })}
    <div class="hp" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
    <div class="field"><label class="check"><input id="consent" name="consent" type="checkbox" value="yes" required aria-required="true" data-validate aria-describedby="consent-error" data-required-msg="Please agree so we can reply to you."><span>I agree to Selo contacting me about my enquiry. See our <a href="${href('/legal/privacy')}">Privacy policy</a>. <span class="req" aria-hidden="true">*</span></span></label><span class="field__error" id="consent-error" hidden></span></div>
    <label class="check"><input name="news" type="checkbox" value="yes"><span>Send me product news (unsubscribe any time).</span></label>
    ${config.forms.turnstileSiteKey ? `<div class="cf-turnstile" data-sitekey="${esc(config.forms.turnstileSiteKey)}"></div>` : '<!-- PLACEHOLDER: Cloudflare Turnstile appears here when forms.turnstileSiteKey is set -->'}
    <div><button class="btn btn--primary" type="submit">Send message</button></div>
    <p class="small muted" style="margin:0"><span aria-hidden="true">*</span> Required</p>
  </form>
  <div class="form-status" data-form-status role="status" aria-live="polite" tabindex="-1" hidden></div>`;
  const body = `${pageHero({ trail: [['Contact', '/contact']], title: 'Talk to us', intro: 'Questions about Selo, pricing or a demo? We usually reply within one business day.', actions: false })}
<section class="section"><div class="container contact-grid">
  <div id="demo"><h2 class="sr-only">Contact form</h2>${form}</div>
  <aside class="stack">
    <div class="card"><h2 style="font-size:1.25rem">Contact details</h2>
      <ul class="contact-list">
        <li>${icon('mail')}<div><b>Sales</b><a class="break" href="mailto:${e.sales}">${e.sales}</a></div></li>
        <li>${icon('life-buoy')}<div><b>Support</b><a class="break" href="mailto:${e.support}">${e.support}</a></div></li>
        <li>${icon('message-circle')}<div><b>WhatsApp</b><a href="${waUrl()}" rel="noopener" data-event="whatsapp_chat_click">Chat with us on WhatsApp</a><br><span class="muted small">${p.whatsapp}</span></div></li>
        <li>${icon('phone')}<div><b>Phone</b><a href="tel:${p.sales.replace(/[^+\d]/g, '')}">${p.sales}</a></div></li>
        <li>${icon('map-pin')}<div><b>Office</b><address style="font-style:normal">${a.street}<br>${a.city}, ${a.region} ${a.postalCode}<br>${a.country}</address></div></li>
        <li>${icon('clock')}<div><b>Support hours</b>${company.supportHours}</div></li>
      </ul>
      <div class="btn-row" style="margin-top:1rem"><a class="btn btn--tertiary" href="${company.helpCentre}" rel="noopener">Help centre ${icon('arrow-right')}</a>${more('/faq', 'FAQ')}</div>
    </div>
    <div class="card"><span class="card__icon">${icon('video')}</span><h2 style="font-size:1.25rem">Book a demo</h2><p>A 30-minute video call to see Selo with your own store in mind.</p>
      ${company.schedulingUrl ? `<a class="btn btn--primary" href="${esc(company.schedulingUrl)}" rel="noopener" data-event="demo_click">Pick a time</a>` : `<a class="btn btn--secondary" href="#demo" data-demo-preset>Request a demo with the form</a>`}
    </div>
    <p class="small muted">We support stores worldwide in English. Support hours cover Europe, the Americas and Asia-Pacific business days.</p>
  </aside>
</div></section>`;
  return { route: '/contact', title: 'Contact Selo: sales, support and demos', description: 'Questions about Selo, pricing or a demo? Send us a message or chat on WhatsApp. We usually reply within one business day.', body, trail: [['Contact', '/contact']], priority: 0.6, extraScriptVars: { upcomingNames }, turnstile: !!config.forms.turnstileSiteKey };
}

// ---------- /security ----------
function security() {
  const body = `${pageHero({ trail: [['Security', '/security']], title: 'Security and data protection', intro: 'How Selo protects your store’s data and your customers’ conversations.', actions: false })}
<section class="section"><div class="container" style="max-width:900px">
  <h2>What we do</h2>
  ${checklist([
    'All traffic is encrypted with HTTPS/TLS.',
    'WhatsApp access tokens are encrypted at rest.',
    'Webhooks from Shopify and Meta are verified by signature before they’re processed.',
    'Shopify’s mandatory privacy webhooks are supported: customer data requests, customer deletion and shop deletion.',
    'Customer photos aren’t stored; they’re fetched from WhatsApp when needed.',
    'The AI uses a commercial AI provider through its API; customer messages are sent only to answer them.',
    'Merchant staff access to the copilot requires number verification, and every action is logged.',
  ])}
  <div class="placeholder-box" style="margin-top:1rem"><strong>PLACEHOLDER:</strong> name the AI sub-processor and link its data-use terms, per legal review.</div>
  <h2 style="margin-top:3rem">Sub-processors</h2>
  <div class="placeholder-box" style="margin-bottom:1rem"><strong>PLACEHOLDER:</strong> legal to confirm providers and regions.</div>
  <div class="table-wrap"><table class="reflow"><caption class="sr-only">Sub-processors</caption>
    <thead><tr><th scope="col">Sub-processor</th><th scope="col">Purpose</th><th scope="col">Region</th></tr></thead>
    <tbody>${[['Hosting provider', 'Runs the Selo app'], ['Database provider', 'Stores app data'], ['AI provider', 'Generates AI replies and drafts'], ['Email provider', 'Sends account and support email']].map(([n, pu]) => `<tr><th scope="row">${n}</th><td data-label="Purpose">${pu}</td><td data-label="Region">To be confirmed</td></tr>`).join('')}</tbody>
  </table></div>
  <h2 style="margin-top:3rem">Report a vulnerability</h2>
  <p>Found a security issue? Email <a href="mailto:${company.emails.security}">${company.emails.security}</a>. Please include steps to reproduce and give us reasonable time to fix it before sharing.</p>
  <p class="muted small">See also <a href="${href('/legal/privacy')}">Privacy policy</a> · <a href="${href('/legal/dpa')}">Data processing addendum</a></p>
</div></section>`;
  return { route: '/security', title: 'Security and data protection | Selo', description: 'Encryption in transit, encrypted access tokens, verified webhooks, Shopify privacy webhooks and how Selo handles customer data.', body, trail: [['Security', '/security']], priority: 0.5 };
}

// ---------- /changelog ----------
export function changelogEntries() {
  const seed = [
    ['2026-11-04', 'New', 'Merchant Copilot: text your store for stats and campaign drafts'],
    ['2026-11-02', 'Improved', 'Schedules, discount expiry and AI dates now follow your store’s time zone'],
    ['2026-10-30', 'New', 'Order in chat: AI order summary with Confirm button and checkout link'],
    ['2026-10-28', 'New', 'AI inbox understands customer photos'],
    ['2026-10-24', 'New', 'WhatsApp quality guardian: frequency cap, auto-pause, quality alerts'],
    ['2026-10-21', 'New', 'Smart audiences for campaigns'],
    ['2026-10-17', 'New', 'AI template writer and weekly Insights'],
    ['2026-10-14', 'New', 'AI inbox assistant with suggest and auto-reply modes'],
    ['2026-10-10', 'New', 'Storefront WhatsApp chat button'],
    ['2026-10-08', 'New', 'Product carousel campaigns'],
    ['2026-10-06', 'Improved', 'Review requests with adjustable delay and product review links'],
    ['2026-10-03', 'New', 'Back-in-stock alerts'],
    ['2026-10-01', 'New', 'Spend and analytics redesign with date ranges'],
  ]; // PLACEHOLDER dates
  const today = new Date().toISOString().slice(0, 10);
  const flagged = enabled().map((f) => [f.releaseDate || today, f.changelog.tag, f.changelog.title]);
  return [...flagged, ...seed].sort((x, y) => (x[0] < y[0] ? 1 : x[0] > y[0] ? -1 : 0));
}
function changelog() {
  const tagCls = { New: 'pill--new', Improved: 'tag-improved', Fixed: 'tag-fixed' };
  const fmt = (d) => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T12:00:00Z'));
  const body = `${pageHero({ trail: [['Changelog', '/changelog']], title: 'Product updates', intro: 'What’s new and improved in Selo.', actions: false })}
<section class="section"><div class="container">
  <ol class="changelog">${changelogEntries().map(([d, tag, title]) => `<li class="reveal"><time datetime="${d}" data-date="${d}">${fmt(d)}</time><span class="pill ${tagCls[tag]}">${tag}</span><h2>${title}</h2></li>`).join('')}</ol>
</div></section>`;
  return { route: '/changelog', title: 'Changelog: product updates | Selo', description: 'New features and improvements in Selo, the WhatsApp app for Shopify.', body, trail: [['Changelog', '/changelog']], priority: 0.5 };
}

// ---------- /blog ----------
export const posts = [
  { slug: 'whatsapp-templates-explained', title: 'WhatsApp templates explained: utility, marketing and service messages', excerpt: 'Which messages need a template, how categories affect cost, and how to get templates approved.', ic: 'file-text', date: '2026-11-03', mins: 6,
    outline: ['What a template is and when you need one', 'Utility, marketing and authentication categories', 'Service conversations and the 24-hour window', 'Tips for faster approval', 'How Selo helps: starters, AI writer and approval tracking'] },
  { slug: 'abandoned-cart-message-ideas', title: '7 abandoned-cart message ideas that respect your customers', excerpt: 'Friendly reminders that bring shoppers back without spamming them.', ic: 'shopping-cart', date: '2026-10-27', mins: 5,
    outline: ['Timing the first reminder', 'Answering the real objection (shipping, sizing, price)', 'When a discount helps, and when it doesn’t', 'Seven example messages', 'Respecting consent and the frequency cap'] },
  { slug: 'ai-customer-service-human-touch', title: 'How to use AI for customer service without losing the human touch', excerpt: 'Where AI helps, where people should step in, and how to set up handovers.', ic: 'bot-message-square', date: '2026-10-20', mins: 7,
    outline: ['Start in Suggest mode', 'Questions AI should answer and questions it shouldn’t', 'Designing a good handover', 'Measuring quality: acceptance, handover rate, reply time', 'Moving to auto-replies safely'] },
];
function blog() {
  const fmt = (d) => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T12:00:00Z'));
  const index = { route: '/blog', title: 'Blog: WhatsApp commerce for Shopify | Selo', description: 'Guides on WhatsApp templates, abandoned-cart messages and AI customer service for Shopify stores.', trail: [['Blog', '/blog']], priority: 0.5,
    body: `${pageHero({ trail: [['Blog', '/blog']], title: 'Blog', intro: 'Practical guides for selling and supporting customers on WhatsApp.', actions: false })}
<section class="section"><div class="container"><div class="grid grid-3">
  ${posts.map((p) => `<article class="card card--link reveal" style="position:relative"><div class="post-cover" aria-hidden="true">${icon(p.ic)}</div><div class="meta-line"><time datetime="${p.date}" data-date="${p.date}">${fmt(p.date)}</time><span>${p.mins} min read</span></div><h2 style="font-size:1.1875rem;margin:0"><a href="${href('/blog/' + p.slug)}" style="color:inherit;text-decoration:none">${p.title}<span style="position:absolute;inset:0" aria-hidden="true"></span></a></h2><p>${p.excerpt}</p></article>`).join('')}
</div></div></section>` };
  const pages = posts.map((p) => ({
    route: `/blog/${p.slug}`, title: `${p.title.length > 48 ? p.title.slice(0, p.title.lastIndexOf(' ', 48)) + '…' : p.title} | Selo`.slice(0, 60), description: p.excerpt,
    trail: [['Blog', '/blog'], [p.title, `/blog/${p.slug}`]], noindex: true, blogPost: p,
    body: `<section class="page-hero"><div class="container" style="max-width:820px">${crumbs([['Blog', '/blog'], [p.title, `/blog/${p.slug}`]])}<h1 style="font-size:clamp(2rem,1.5rem + 2vw,2.75rem)">${p.title}</h1><div class="meta-line"><time datetime="${p.date}" data-date="${p.date}">${fmt(p.date)}</time><span>${p.mins} min read</span></div></div></section>
<section class="section"><div class="container prose" style="max-width:820px">
  <div class="placeholder-box"><strong>PLACEHOLDER:</strong> article to be written. This page is set to noindex and left out of the sitemap until it is.</div>
  <p class="lead" style="margin-top:1.5rem">${p.excerpt}</p>
  <h2>Planned outline</h2><ol>${p.outline.map((o) => `<li>${o}</li>`).join('')}</ol>
  <p>${more('/blog', 'All posts')}</p>
</div></section>`,
  }));
  return [index, ...pages];
}

// ---------- careers / press (footer placeholders) ----------
function careers() {
  return { route: '/careers', title: 'Careers at Selo', description: 'Selo is not hiring right now. Check back later or get in touch.', trail: [['Careers', '/careers']], priority: 0.2,
    body: `${pageHero({ trail: [['Careers', '/careers']], title: 'We’re not hiring right now', intro: `We’ll post roles here when we are. In the meantime you’re welcome to say hello at <a href="mailto:${company.emails.general}">${company.emails.general}</a>.`, actions: false })}` };
}
function press() {
  return { route: '/press', title: 'Press kit | Selo', description: 'Selo logo, product description and press contact.', trail: [['Press kit', '/press']], priority: 0.2,
    body: `${pageHero({ trail: [['Press kit', '/press']], title: 'Press kit', intro: `For press enquiries email <a href="mailto:${company.emails.press}">${company.emails.press}</a>.`, actions: false })}
<section class="section"><div class="container" style="max-width:900px">
  <div class="placeholder-box" style="margin-bottom:2rem"><strong>PLACEHOLDER:</strong> add downloadable logo files, product screenshots and founder bios.</div>
  <h2 style="font-size:1.5rem">About Selo</h2>
  <p>${esc(brand.productName)} is a Shopify app that turns WhatsApp into a revenue and service channel. Stores connect their WhatsApp Business number in a few clicks, send order and shipping updates automatically, recover abandoned carts, run targeted campaigns with real Shopify discount codes, and let an AI assistant answer customer questions from live order, product and policy data. Every message, cost and sale is tracked, so merchants see exactly what WhatsApp earns them.</p>
  <h2 style="font-size:1.5rem;margin-top:2rem">Logo</h2>
  <div class="card" style="flex-direction:row;align-items:center;gap:1.5rem;flex-wrap:wrap"><span class="logo" style="font-size:2rem">${'<img src="__MARK__" alt="Selo logo mark" width="72" height="72">'}<span>Selo</span></span><p class="small">Use the mark on its green rounded square. Don't recolour it or place it on busy backgrounds.</p></div>
</div></section>` };
}

// ---------- 404 ----------
function notFound() {
  const links = [['/', 'Home'], ['/features', 'Features'], ['/pricing', 'Pricing'], ['/contact', 'Contact']].map(([r, l]) => `<a href="${href(r)}">${l}</a>`).join(' · ');
  return { route: '/404', title: 'Page not found | Selo', description: 'The page you’re looking for doesn’t exist or has moved.', noindex: true, noCta: true,
    body: `<section class="section"><div class="container notice-404">
  <div><p class="eyebrow">404</p><h1>This page took a different route</h1><p class="lead">The page you’re looking for doesn’t exist or has moved.</p>
  <div class="btn-row btn-row--stack-mobile"><a class="btn btn--primary" href="${href('/')}">Go to home</a><a class="btn btn--secondary" href="${href('/contact')}">Contact us</a></div></div>
  <div class="feature-row__visual">${notFoundChat(links)}</div>
</div></section>` };
}

export default function companyPages() {
  return [howItWorks(), useCases(), customers(), faq(), about(), contact(), security(), changelog(), ...blog(), careers(), press(), notFound()];
}
