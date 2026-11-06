// FAQ content (brief 5.13), plus pricing FAQ (5.9). Upcoming-feature questions join only when flagged on.
import { href } from '../../lib/core.mjs';
import { upcoming, on } from './upcoming.mjs';

export function faqGroups() {
  const groups = [
    { id: 'getting-started', title: 'Getting started', items: [
      { q: 'What is Selo?', a: 'A Shopify app that connects your store to WhatsApp for automated order updates, campaigns, AI customer replies and analytics.' },
      { q: 'Do I need a WhatsApp Business account?', a: 'You need a WhatsApp Business Platform account, which you create or connect during setup with your Meta account. The free WhatsApp Business phone app is a different product.' },
      { q: 'Can I use my existing number?', a: "Yes, if it isn't currently registered on the WhatsApp or WhatsApp Business phone app. Otherwise use a new number or move it off the phone app first." },
      { q: 'How long does setup take?', a: 'Most stores connect WhatsApp and turn on their first automation in one session. Template approval by WhatsApp is usually quick but can take longer.' },
      { q: 'Which countries do you support?', a: 'Stores and customers anywhere WhatsApp Business Platform messaging is available.' },
    ] },
    { id: 'messages-and-costs', title: 'Messages and costs', items: [
      { q: 'Who pays for WhatsApp messages?', a: 'Meta bills message fees to your WhatsApp Business account. Selo estimates costs before you send and tracks your spend.' },
      { q: "What's a template, and why does it need approval?", a: "WhatsApp requires pre-approved templates for messages you start (order updates, campaigns). Replies within 24 hours of a customer's message can be free-form." },
      { q: 'Can I send messages in several languages?', a: "Yes. Templates can be created in many languages, and the AI replies in your customer's language when it's one you've chosen." },
    ] },
    { id: 'ai', title: 'AI', items: [
      { q: 'Will the AI make things up?', a: "Replies are checked: order numbers, amounts, tracking codes and links must come from your store's data or the reply isn't sent. Unsure cases go to your team." },
      { q: 'Can I review AI replies before they’re sent?', a: 'Yes. Use Suggest mode, or allow auto-replies only outside business hours.' },
      { q: 'How is AI usage billed?', a: "Each plan includes a monthly AI allowance. You choose what happens when it's used up." },
      { q: 'What is the Copilot?', a: 'A way for you and your staff to text your store’s WhatsApp number for stats and campaign drafts you approve.' },
    ] },
    { id: 'privacy', title: 'Privacy and compliance', items: [
      { q: 'How do you handle consent?', a: 'Marketing goes only to opted-in customers; opt-outs are honoured automatically and recorded.' },
      { q: 'Is my customer data safe?', a: `See <a href="${href('/security')}">Security</a>. Data is encrypted in transit, access tokens are encrypted at rest, and Shopify data requests and deletions are handled automatically.` },
      { q: 'Do you store customer photos?', a: 'No. Photos customers send are read from WhatsApp when needed and not stored by Selo.' },
    ] },
    { id: 'billing', title: 'Billing', items: [
      { q: 'How am I billed?', a: 'Through your Shopify invoice.' },
      { q: 'Can I cancel any time?', a: 'Yes. Uninstall or change plans from Shopify.' },
    ] },
  ];
  // Upcoming features: add their questions only when their flag is on.
  for (const f of Object.values(upcoming)) {
    if (!on(f.flag)) continue;
    let g = groups.find((x) => x.id === f.faq.group);
    if (!g) { g = { id: 'cash-on-delivery', title: 'Cash on delivery', items: [] }; groups.splice(2, 0, g); }
    g.items.push({ q: f.faq.q, a: f.faq.a });
  }
  return groups;
}

export function pricingFaq(config) {
  return [
    { q: 'Do I need a WhatsApp Business account?', a: 'You need a WhatsApp Business Platform account. You create or connect it during setup by signing in with your Meta account.' },
    { q: 'What do WhatsApp messages cost?', a: 'Meta charges for some messages, such as marketing and utility templates, at rates that vary by country. Selo shows an estimate before every campaign and tracks what you spend.' },
    { q: 'Can I change plans?', a: 'Yes. Upgrade or downgrade any time from the app; Shopify adjusts your bill.' },
    { q: 'What happens when the AI budget runs out?', a: 'You choose: keep AI suggestions only, or turn the AI off until next month. Your automations and campaigns keep running either way.' },
    { q: 'Do you charge per message?', a: 'No. You pay the plan fee only; Meta bills WhatsApp message fees to your WhatsApp Business account.' },
    { q: 'Is there a setup fee?', a: 'No.' }, // PLACEHOLDER
  ];
}
