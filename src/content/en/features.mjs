import { href, icon, money, config } from '../../lib/core.mjs';
import { card, sectionHead, pageHero, block, checklist, more } from '../../lib/components.mjs';
import { automationFunnelMock, composeMock, funnelMock, dashboardMock, spendMock, qualityMock, inboxMock } from '../../lib/mockups.mjs';
import { scriptC, scriptD, scriptE, photoChat } from './chats.mjs';
import { upcoming, on, disabled } from './upcoming.mjs';

const F = 'Features';
const trail = (label, route) => [[F, '/features'], [label, route]];

// ---------- /features ----------
function overview() {
  const cards = [
    { ic: 'zap', title: 'Automations', link: '/features/automations', bullets: ['Order, payment, shipping and refund updates', 'Abandoned checkout and back-in-stock alerts', 'Review requests after delivery'] },
    { ic: 'megaphone', title: 'Campaigns', link: '/features/campaigns', bullets: ['Announcements, coupons and product carousels', 'Smart audiences and Shopify segments', 'Cost estimate before you send'] },
    { ic: 'bot-message-square', title: 'AI assistant', link: '/features/ai-assistant', bullets: ['Answers from live orders, products and policies', 'Suggest or auto-reply modes', 'Hands over to your team when it should'] },
    { ic: 'smartphone', title: 'Copilot', link: '/features/copilot', bullets: ['Ask for your numbers by WhatsApp', 'Draft campaigns from a message', 'Nothing sends until you approve'] },
    { ic: 'chart-column', title: 'Analytics', link: '/features/analytics', bullets: ['Revenue from WhatsApp on your dashboard', 'Full funnel per campaign and automation', 'Spend by day and by country'] },
    { ic: 'shield-check', title: 'Quality and compliance', link: '/features/quality', bullets: ['Consent recorded for every contact', 'Opt-outs honoured instantly', 'Quality guardian and frequency cap'] },
  ];
  const also = [
    ['message-circle', 'Storefront WhatsApp chat button (added from your theme editor)'],
    ['bell', 'Back-in-stock “Notify me” sign-up on product pages'],
    ['file-check', 'Template editor with ready-made starters and approval tracking'],
    ['wand-sparkles', 'AI template writer'],
    ['languages', 'Message templates in multiple languages'],
    ['users', 'Contacts with consent history and filters'],
    ['wallet', 'Spend tracking in your WhatsApp billing currency'],
    ['sparkles', 'Weekly AI insights card'],
    ['clock', 'Store time zone for every schedule and date'],
    ['shield', 'Customer data requests and deletion handled automatically'],
  ];
  if (on('voiceNotes')) also.push([upcoming.voiceNotes.alsoIncluded.ic, upcoming.voiceNotes.alsoIncluded.text]);
  const soon = config.features.showComingSoon ? disabled() : [];
  const body = `${pageHero({ trail: [[F, '/features']], title: 'Everything you need to sell and support on WhatsApp', intro: 'Selo brings automated messages, campaigns, AI customer service and analytics into one Shopify app, so you don’t need to stitch several tools together.' })}
<section class="section"><div class="container"><div class="grid grid-3">
  ${cards.map((c) => card({ ...c, linkText: `Explore ${c.title.toLowerCase()}` })).join('')}
</div></div></section>
<section class="section section--alt" aria-labelledby="also-h"><div class="container">
  ${sectionHead({ id: 'also-h', title: 'Also included' })}
  <ul class="grid grid-3" style="list-style:none;padding:0;margin:0">${also.map(([ic, txt]) => `<li class="tile reveal">${icon(ic)}<span>${txt}</span></li>`).join('')}</ul>
</div></section>
${soon.length ? `<section class="section" aria-labelledby="soon-h"><div class="container">
  ${sectionHead({ id: 'soon-h', title: 'Coming soon' })}
  <div class="grid grid-4">${soon.map((f) => `<article class="card soon reveal"><span class="pill pill--outline">Coming soon</span><h3>${f.name}</h3><p>${f.oneLine}</p><a class="btn btn--tertiary" href="${href(`/contact#notify-${f.slug}`)}">Get notified ${icon('arrow-right')}</a></article>`).join('')}</div>
</div></section>` : ''}`;
  return { route: '/features', title: 'Features: WhatsApp for Shopify | Selo', description: 'Automations, campaigns, an AI assistant, a merchant copilot, analytics and compliance tools for WhatsApp, in one Shopify app.', body, trail: [[F, '/features']], priority: 0.9 };
}

// ---------- /features/automations ----------
function automations() {
  const codRow = on('codRiskScoring') ? upcoming.codRiskScoring.automationRowText : 'Asks the customer to confirm the order and the amount due on delivery';
  const rows = [
    ['Order confirmation', 'Right after an order is placed', `“Hi Jamie, thanks for your order #1001! Total: ${money(49.99, 'USD')}. We’ll message you when it ships.”`],
    ['Cash-on-delivery confirmation', 'When a cash-on-delivery order is placed', codRow],
    ['Payment confirmation', 'When payment is captured', `“Payment of ${money(89, 'EUR')} received for order #1002.”`],
    ['Shipping & tracking', 'When the order is fulfilled, with or without tracking', 'Carrier, tracking number and link'],
    ['Refund confirmation', 'When a refund is issued', 'Refund amount and order number'],
    ['Abandoned checkout reminder', 'When a shopper leaves checkout', 'A reminder with a link back to their cart'],
    ['Back-in-stock alert', 'When a product a customer asked about is restocked', 'Sent once per restock, with a button to the product'],
    ['Review request', 'An adjustable delay after delivery; skipped for cancelled or refunded orders', 'A link to review the product'],
  ];
  const body = `${pageHero({ trail: trail('Automations', '/features/automations'), title: 'Order updates that send themselves', intro: 'Keep customers informed at every step after they buy. Each automation uses a message template you choose and is sent the moment the event happens in Shopify.' })}
<section class="section"><div class="container">
  ${sectionHead({ title: 'Eight automations, ready to switch on', id: 'list' })}
  <div class="table-wrap reveal"><table class="reflow">
    <caption class="sr-only">Automations, when they send, and an example message (sample)</caption>
    <thead><tr><th scope="col">Automation</th><th scope="col">When it sends</th><th scope="col">Example message (sample)</th></tr></thead>
    <tbody>${rows.map(([a, w, e]) => `<tr><th scope="row">${a}</th><td data-label="When it sends">${w}</td><td data-label="Example (sample)">${e}</td></tr>`).join('')}</tbody>
  </table></div>
  ${on('codRiskScoring') ? `<div style="margin-top:var(--section)">${upcoming.codRiskScoring.section()}</div>` : ''}
  ${on('addressFixer') ? `<div style="margin-top:var(--section)">${upcoming.addressFixer.section()}</div>` : ''}
</div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'Built-in good manners', checks: [
    'Each automation only accepts templates made for its event, so the wrong message can’t go out.',
    'Back-in-stock alerts never message the same customer twice for one restock.',
    'Review requests skip cancelled and refunded orders.',
    'Marketing messages respect each customer’s consent; order updates are service messages.',
  ] })}
</div></section>
<section class="section"><div class="container">
  ${block({ title: 'See what each automation earns', text: 'Every automation has its own funnel, from sent to delivered, read, clicked and ordered, with the revenue credited to it.', visual: automationFunnelMock() })}
  ${block({ id: 'back-in-stock', title: 'Back-in-stock sign-ups', text: 'Add a “Notify me on WhatsApp” block to sold-out product pages from the theme editor. Customers sign up in one tap and get one message when it’s back.', reverse: true, visual: `<div class="mock" aria-label="Product page preview with a Notify me on WhatsApp button"><div class="mock__head"><span class="mock__title">Canvas Weekender Bag</span><span class="pill pill--sample">Preview</span></div><div class="post-cover" style="aspect-ratio:16/8">${icon('shopping-bag')}</div><p style="margin:.25rem 0"><strong>${money(79, 'EUR')}</strong> · <span class="muted">Sold out</span></p><span class="btn btn--primary btn--block" aria-hidden="true">${icon('bell')} Notify me on WhatsApp</span></div>` })}
</div></section>`;
  return { route: '/features/automations', title: 'WhatsApp order updates for Shopify | Selo', description: 'Order, payment, shipping, refund, abandoned checkout, back-in-stock and review messages on WhatsApp, sent the moment they happen in Shopify.', body, trail: trail('Automations', '/features/automations'), priority: 0.8 };
}

// ---------- /features/campaigns ----------
function campaigns() {
  const body = `${pageHero({ trail: trail('Campaigns', '/features/campaigns'), title: 'Campaigns that reach the right customers, and prove they worked', intro: 'Announcements, coupons and product carousels, sent to opted-in customers and measured all the way to the order.' })}
<section class="section"><div class="container">
  ${sectionHead({ title: 'Three kinds of campaign' })}
  <div class="grid grid-3">
    ${card({ ic: 'megaphone', title: 'Announcement', text: 'News, sales, new collections, personalised with the customer’s name.' })}
    ${card({ ic: 'badge-percent', title: 'Discount coupon', text: 'Selo creates a real Shopify discount code for the campaign, and customers copy it with one tap.' })}
    ${card({ ic: 'shopping-bag', title: 'Product promotion', text: 'One product, several products, or a swipeable carousel of 2 to 10 product cards, each with a buy link. Buy links can open the exact variant and apply the discount automatically.' })}
  </div>
  <div style="margin-top:var(--section)">${block({ title: 'Product carousels in the chat', text: 'Customers swipe through your picks and tap Buy now to land in checkout.', visual: scriptD() })}</div>
</div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'Choose who gets it', text: 'Only customers who opted in ever receive a campaign.', checks: [
    'Everyone who opted in to WhatsApp marketing',
    '<strong>Abandoned carts:</strong> left a cart 2 to 30 days ago and haven’t ordered',
    '<strong>Waiting for a product:</strong> asked to hear when a sold-out product is back',
    '<strong>Repeat buyers who stopped ordering:</strong> 2+ orders, none in 60 days',
    'Any Shopify customer segment, for example your VIPs',
    'Hand-picked contacts (up to 1,000)',
  ], visual: composeMock(), reverse: true })}
</div></section>
<section class="section"><div class="container"><div class="grid grid-3">
  ${card({ ic: 'wallet', title: 'Know the cost before you send', text: 'See the number of recipients and the estimated cost, priced by each customer’s country using WhatsApp’s own rates, in your WhatsApp billing currency.' })}
  ${card({ ic: 'calendar-clock', title: 'Send now or schedule', text: 'Schedule in your store’s time zone. Pause, resume or cancel any time.' })}
  ${card({ ic: 'wand-sparkles', title: 'Write templates faster with AI', text: 'Describe the offer and the AI writer drafts a WhatsApp template that follows WhatsApp’s rules. Or start from ready-made starters. Selo submits it for approval and tracks its status.' })}
</div></div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'Results you can trust', text: 'A funnel for every campaign: sent, delivered, read, clicked, viewed product, added to cart, started checkout and ordered. Revenue by link and by discount code, cost and return on spend, compared with the previous period.', visual: funnelMock() })}
</div></section>`;
  return { route: '/features/campaigns', title: 'WhatsApp campaigns for Shopify | Selo', description: 'Send announcements, real Shopify discount codes and product carousels to opted-in customers on WhatsApp, with smart audiences and full results.', body, trail: trail('Campaigns', '/features/campaigns'), priority: 0.8 };
}

// ---------- /features/ai-assistant ----------
function aiAssistant() {
  const body = `${pageHero({ trail: trail('AI assistant', '/features/ai-assistant'), title: 'An AI assistant that answers from your store, not from guesswork', intro: 'Selo’s AI reads your customers’ WhatsApp messages and replies using your live Shopify orders, products, policies and FAQs. When it can’t or shouldn’t answer, it hands the chat to your team.' })}
<section class="section"><div class="container">
  ${sectionHead({ title: 'Three modes, your choice' })}
  <div class="grid grid-3">
    ${card({ ic: 'user', title: 'Off', text: 'Your team answers everything in the Selo inbox.' })}
    ${card({ ic: 'pencil', title: 'Suggest', text: 'The AI drafts each reply; your team sends, edits or discards it.' })}
    ${card({ ic: 'bot', title: 'Auto-reply', text: 'The AI sends replies to routine questions such as order status, delivery and store info. You can limit auto-replies to outside your business hours.' })}
  </div>
</div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'What it can answer', checks: ['Where is my order, and tracking', 'What’s in stock, prices and sizes', 'Refund, shipping and other store policies', 'Your own FAQs and notes'], visual: inboxMock() })}
</div></section>
<section class="section"><div class="container">
  ${block({ id: 'order-in-chat', title: 'Order in the chat', text: 'The customer names a product. The AI checks the exact variant, stock and price, then sends a summary with Confirm and Cancel buttons. Confirm sends a checkout link with the cart filled in.', checks: ['Nothing is ordered until the customer pays.', 'Prices and totals always come from Shopify, never from the AI.'], visual: scriptC() })}
  ${block({ id: 'photos', title: 'Understands photos', checks: ['A photo of a damaged item opens a return case for your team.', '“Do you have this?” with a photo finds similar products.', 'Payment screenshots go to your team.'], visual: photoChat(), reverse: true })}
  ${on('voiceNotes') ? upcoming.voiceNotes.section() : ''}
</div></section>
<section class="section section--alt"><div class="container"><div class="grid grid-2">
  <div class="card reveal"><span class="card__icon">${icon('hand')}</span><h2 style="font-size:1.5rem">Knows when to hand over</h2><p>Complaints, refund and change requests, angry customers, requests for a person, or anything it isn’t sure about go to your team. The customer is told a person will reply.</p></div>
  <div class="card reveal"><span class="card__icon">${icon('shield-check')}</span><h2 style="font-size:1.5rem">Guardrails built in</h2>${checklist([
    'Order numbers, amounts, tracking codes and links in a reply must come from your store’s data, or the reply isn’t sent.',
    'It only replies inside WhatsApp’s 24-hour customer service window.',
    'It never asks for payment details or passwords.',
    'It never offers discounts or changes orders on its own.',
    'Customers who reply STOP are opted out and get no AI reply.',
  ])}</div>
</div></div></section>
<section class="section"><div class="container"><div class="grid grid-3">
  ${card({ ic: 'languages', title: 'Speaks your customers’ language', text: 'Choose reply languages and tone (friendly, professional or casual). It replies in the customer’s language, mixes like Hinglish included, when that’s one of your languages.' })}
  ${card({ ic: 'book-open', title: 'Your knowledge base', text: 'Shopify policies are imported automatically and kept fresh. Add FAQs and notes in plain words.' })}
  ${card({ ic: 'gauge', title: 'You control the cost', text: 'Every plan includes a monthly AI budget. You choose what happens when it’s used up: keep suggestions only, or turn the AI off.' })}
</div></div></section>`;
  return { route: '/features/ai-assistant', title: 'AI WhatsApp customer service for Shopify | Selo', description: 'An AI assistant that answers WhatsApp questions from your live Shopify orders, products and policies, and hands over to your team when it should.', body, trail: trail('AI assistant', '/features/ai-assistant'), priority: 0.8 };
}

// ---------- /features/copilot ----------
function copilot() {
  const qs = [
    ['How were sales today?', 'Orders, sales, average order value, comparison with yesterday, and sales from WhatsApp.'],
    ['How did last week’s campaigns do?', 'Results for each campaign, with revenue and cost.'],
    ['Any chats waiting for us?', 'Conversations the AI handed to your team.'],
    ['How many messages did we send this month?', 'Message counts and estimated cost.'],
  ];
  const body = `${pageHero({ trail: trail('Copilot', '/features/copilot'), pill: '<span class="pill pill--new">New</span> ', title: 'Text your store. Get answers.', intro: 'Selo Copilot lets you and your team message your shop’s WhatsApp number from your own phones. Ask for your numbers, or ask for a campaign and approve it with one tap.' })}
<section class="section"><div class="container">
  ${sectionHead({ title: 'Ask anything about your store' })}
  <div class="grid grid-4">${qs.map(([q, a]) => `<article class="card reveal"><div class="bubble" style="background:var(--bubble-store);align-self:flex-start"><p><strong>“${q}”</strong></p></div><p>${a}</p></article>`).join('')}</div>
</div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'Draft campaigns from a message', text: '“Send the Black Friday offer to VIPs at 7pm tomorrow.” The copilot finds the template and the segment, checks the time and discount, and sends a summary with the recipient count and estimated cost.', checks: ['Nothing is sent until you tap <strong>Approve</strong>.'], visual: scriptE() })}
</div></section>
${on('copilotDailySummary') ? `<section class="section"><div class="container">${upcoming.copilotDailySummary.section()}</div></section>` : ''}
<section class="section${on('copilotDailySummary') ? ' section--alt' : ''}"><div class="container">
  ${block({ title: 'Safe by design', checks: [
    'Only numbers you add and verify in the app can use it; the number proves itself by sending a code.',
    'Two permissions: <em>Stats only</em> for staff, or <em>Stats and campaigns</em>.',
    'Numbers, permissions and removals are managed only in the app, never by chat.',
    'Every question, draft and approval is logged, along with who approved what.',
    'Copilot messages never appear in your customer inbox.',
    'Run several stores? The copilot asks which store you mean.',
  ] })}
</div></section>`;
  return { route: '/features/copilot', title: 'Selo Copilot: text your Shopify store on WhatsApp', description: 'Ask your store for today’s sales, campaign results and waiting chats on WhatsApp, and approve campaign drafts with one tap.', body, trail: trail('Copilot', '/features/copilot'), priority: 0.8 };
}

// ---------- /features/analytics ----------
function analytics() {
  const body = `${pageHero({ trail: trail('Analytics', '/features/analytics'), title: 'See what WhatsApp really earns you', intro: 'Revenue, orders, costs and results for every campaign and automation, in plain numbers you can follow.' })}
<section class="section"><div class="container">
  ${block({ title: 'Revenue from WhatsApp', text: 'Orders credited to campaigns, automations and chat checkouts, on your home dashboard, with the last 30 days compared with the 30 before.', visual: dashboardMock() })}
  ${block({ title: 'Full funnel per campaign and automation', text: 'Sent → delivered → read → clicked → viewed product → added to cart → started checkout → ordered.', visual: funnelMock(), reverse: true })}
</div></section>
<section class="section section--alt"><div class="container"><div class="grid grid-3">
  ${card({ ic: 'route', title: 'Attribution you can follow', text: 'Orders credited by tracked link or by discount code, shown in plain words.' })}
  ${card({ ic: 'banknote', title: 'Return on spend', text: 'Revenue compared with cost in one currency, using daily European Central Bank exchange rates when currencies differ.' })}
  ${card({ ic: 'sparkles', title: 'Weekly AI insights', text: 'A short weekly summary of what worked and what to try next, written from numbers Selo calculated.' })}
</div></div></section>
<section class="section"><div class="container">
  ${block({ title: 'Spend, by day and by country', text: 'Estimated message costs in your WhatsApp billing currency, by market and category, with chart and table views and date ranges: today, last 7, 30 or 90 days, this month, last month, or custom.', visual: spendMock() })}
</div></section>`;
  return { route: '/features/analytics', title: 'WhatsApp analytics and attribution | Selo', description: 'Revenue from WhatsApp, full funnels per campaign and automation, attribution by link and discount code, and message spend by day and country.', body, trail: trail('Analytics', '/features/analytics'), priority: 0.8 };
}

// ---------- /features/quality ----------
function quality() {
  const body = `${pageHero({ trail: trail('Quality and compliance', '/features/quality'), title: 'Grow on WhatsApp without risking your number', intro: 'Consent, opt-outs, frequency limits and quality monitoring are built in, so growth doesn’t cost you your WhatsApp number.' })}
<section class="section"><div class="container"><div class="grid grid-2">
  ${card({ ic: 'file-check', title: 'Consent, recorded', text: 'Customers opt in at checkout or through your storefront widget. Each contact shows its consent status, source and history. Marketing goes only to opted-in customers.', tag: 'h2' })}
  ${card({ ic: 'ban', title: 'Opt-outs honoured instantly', text: 'Replies like STOP or UNSUBSCRIBE, or a tap on “Stop promotions”, opt the customer out automatically.', tag: 'h2' })}
  ${card({ ic: 'gauge', title: 'Frequency cap', text: 'Limit how many marketing messages one customer can get in a period. Recipients at the limit are skipped and counted.', tag: 'h2' })}
  ${card({ ic: 'shield', title: 'Privacy requests handled', text: 'Shopify customer data requests and deletions are handled automatically, including phone-only contacts.', tag: 'h2' })}
</div></div></section>
<section class="section section--alt"><div class="container">
  ${block({ title: 'Quality guardian', text: 'Selo watches your number’s quality rating, your templates’ quality and opt-out spikes after campaigns. It alerts you in plain language and can pause scheduled and sending campaigns automatically if your rating turns low.', visual: qualityMock() })}
</div></section>
<section class="section section--tight"><div class="container"><div class="btn-row">
  ${more('/security', 'Security and data protection')} ${more('/legal/acceptable-use', 'Messaging rules (acceptable use)')}
</div></div></section>`;
  return { route: '/features/quality', title: 'WhatsApp consent, compliance and quality | Selo', description: 'Recorded consent, instant opt-outs, a frequency cap and a quality guardian that protects your WhatsApp number while you grow.', body, trail: trail('Quality and compliance', '/features/quality'), priority: 0.8 };
}

export default function features() {
  return [overview(), automations(), campaigns(), aiAssistant(), copilot(), analytics(), quality()];
}
