import { href, installUrl, icon, t, config } from '../../lib/core.mjs';
import { card, sectionHead, more, faqList, sampleLabel } from '../../lib/components.mjs';
import { revenueCard, composeMock, qualityMock } from '../../lib/mockups.mjs';
import { scriptA, scriptB, scriptC, scriptE } from './chats.mjs';
import { faqGroups } from './faq.mjs';
import { upcoming, on } from './upcoming.mjs';
import { testimonials } from './shared.mjs';

export default function home() {
  const rows = [
    { h: 'Recover carts while they’re still warm', p: 'When a shopper leaves checkout, Selo sends a friendly WhatsApp reminder with a link straight back to their cart. Sales from the reminder are counted on your dashboard.', v: scriptB(), link: ['/features/automations', 'Automations'] },
    { h: 'Let customers order right in the chat', p: 'A customer writes “the blue linen shirt in M, two please”. The AI finds the exact item, checks stock and price, and sends an order summary with a Confirm button. One tap gets them a checkout link with the cart already filled.', v: scriptC(), link: ['/features/ai-assistant', 'AI assistant'] },
    { h: 'Campaigns with smart audiences', p: 'Reach shoppers who abandoned a cart, customers waiting for a product to come back, or repeat buyers who stopped ordering. Or use any Shopify customer segment.', v: composeMock(), link: ['/features/campaigns', 'Campaigns'] },
    { h: 'Text your store, get answers', p: 'Ask “How were sales today?” from your own phone and get the numbers. Say “Send the Black Friday offer to VIPs at 7pm tomorrow” and get a ready draft to approve.' + (on('copilotDailySummary') ? ` ${upcoming.copilotDailySummary.homeLine}` : ''), v: scriptE(), link: ['/features/copilot', 'Copilot'] },
    { h: 'Protect your WhatsApp number', p: 'Consent is recorded for every contact, “STOP” is honoured automatically, a frequency cap stops over-messaging, and campaigns pause themselves if your number’s quality drops.', v: qualityMock(), link: ['/features/quality', 'Quality & compliance'] },
  ];
  const faqs = faqGroups().flatMap((g) => g.items).slice(0, 5);

  const body = `
<section class="hero" aria-labelledby="hero-h"><div class="container hero__grid">
  <div>
    <p class="eyebrow">The WhatsApp app for Shopify</p>
    <h1 id="hero-h">Sell, support and grow on WhatsApp, on autopilot</h1>
    <p class="hero__sub">Selo sends your order updates, recovers abandoned carts, runs campaigns with real discount codes, and answers customers with AI that knows your store. Every message tracked to the sale.</p>
    <div class="btn-row btn-row--stack-mobile">
      <a class="btn btn--primary" href="${installUrl()}" data-event="install_click" rel="noopener">${t('nav.install')}</a>
      <a class="btn btn--secondary" href="${href('/how-it-works')}">See how it works</a>
    </div>
    <ul class="trust-line">
      <li>${icon('circle-check')}Works with any Shopify plan</li>
      <li>${icon('circle-check')}Connect your WhatsApp number in minutes</li>
      <li>${icon('circle-check')}Consent and opt-outs built in</li>
    </ul>
  </div>
  <div class="hero__visual">${scriptA()}${revenueCard()}</div>
</div></section>

<section class="section section--alt" aria-labelledby="pillars-h"><div class="container">
  ${sectionHead({ id: 'pillars-h', title: 'One app for selling, support and results', text: 'Everything runs from your Shopify admin, on your own WhatsApp Business number.', center: true })}
  <div class="grid grid-4">
    ${card({ ic: 'zap', title: 'Automate the essentials', text: 'Order confirmations, payment and refund updates, shipping and tracking, cash-on-delivery confirmations. Sent automatically the moment they happen in Shopify.', link: '/features/automations' })}
    ${card({ ic: 'megaphone', title: 'Campaigns that pay for themselves', text: 'Send offers, new arrivals and product carousels to the right customers, with real Shopify discount codes and buy links that land in checkout.', link: '/features/campaigns' })}
    ${card({ ic: 'bot-message-square', title: 'AI that answers like your best agent', text: 'Replies to order, product and policy questions from your live store data, in your customer’s language, and hands over to your team when it should.' + (on('voiceNotes') ? ` ${upcoming.voiceNotes.homeLine}` : ''), link: '/features/ai-assistant' })}
    ${card({ ic: 'chart-column', title: 'Know exactly what WhatsApp earns', text: 'Revenue, orders and cost for every campaign and automation, from sent to delivered, read, clicked and bought.', link: '/features/analytics' })}
  </div>
</div></section>

<section class="section" aria-label="Feature highlights"><div class="container feature-rows">
  ${rows.map((r, i) => `<div class="split feature-row${i % 2 ? ' split--reverse' : ''} reveal">
    <div><h2>${r.h}</h2><p>${r.p}</p>${more(r.link[0], `${r.link[1]}`)}</div>
    <div class="feature-row__visual">${r.v}</div>
  </div>`).join('')}
</div></section>

<section class="section section--soft" aria-labelledby="how-h"><div class="container">
  ${sectionHead({ id: 'how-h', title: 'Live on WhatsApp in four steps', center: true })}
  <ol class="steps steps--4">
    <li class="reveal"><h3>Install Selo</h3><p>Add it from the Shopify App Store.</p></li>
    <li class="reveal"><h3>Connect your number</h3><p>Link your WhatsApp Business number with your Meta account.</p></li>
    <li class="reveal"><h3>Turn on automations</h3><p>Pick your message templates.</p></li>
    <li class="reveal"><h3>Watch the results</h3><p>See orders and revenue from WhatsApp on your dashboard.</p></li>
  </ol>
  <p style="text-align:center;margin-top:2rem">${more('/how-it-works', 'See the full setup')}</p>
</div></section>

<section class="section" aria-labelledby="stats-h"><div class="container">
  <h2 id="stats-h" class="sr-only">At a glance</h2>
  <div class="stats">
    <div class="reveal"><span class="stat__value">5 minutes</span><span class="stat__label">average setup time</span></div>
    <div class="reveal"><span class="stat__value">24/7</span><span class="stat__label">AI replies, with handover to your team</span></div>
    <div class="reveal"><span class="stat__value">1 app</span><span class="stat__label">for automations, campaigns, AI and analytics</span></div>
  </div>
  <p class="sample-note">${sampleLabel(t('common.exampleResults'))}</p>
</div></section>

<section class="section section--alt" aria-labelledby="quotes-h"><div class="container">
  ${sectionHead({ id: 'quotes-h', title: 'What stores could say', text: 'These are sample testimonials that show how stores use Selo. Real customer stories will replace them.', center: true })}
  <div class="grid grid-3">${testimonials()}</div>
</div></section>

<section class="section" aria-labelledby="price-h"><div class="container">
  <div class="card card--flat reveal" style="flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.5rem;padding:2rem">
    <div><h2 id="price-h" style="font-size:clamp(1.5rem,1.2rem + 1.2vw,2rem);margin:0">Plans for every stage</h2><p style="margin:.35rem 0 0">Start free for ${config.trial.days} days.</p></div>
    <a class="btn btn--primary" href="${href('/pricing')}">See pricing</a>
  </div>
</div></section>

<section class="section section--tight" aria-labelledby="faq-h"><div class="container" style="max-width:860px">
  ${sectionHead({ id: 'faq-h', title: 'Questions, answered' })}
  ${faqList(faqs)}
  <p style="margin-top:1.5rem">${more('/faq', 'All questions')}</p>
</div></section>`;

  return {
    route: '/', title: 'Selo: WhatsApp marketing & AI support for Shopify',
    description: 'Automated order updates, cart recovery, campaigns with real discount codes and an AI assistant that answers from your store data. WhatsApp for Shopify.',
    ogTitle: 'Sell, support and grow on WhatsApp, on autopilot',
    body, priority: 1.0, softwareApp: true,
  };
}
