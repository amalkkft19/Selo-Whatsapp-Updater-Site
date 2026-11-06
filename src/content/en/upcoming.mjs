// Upcoming features (brief section 14). Each feature's content lives here, in one object,
// and is rendered ONLY when its flag in site.config.json is true. Flags are read at build time,
// so a disabled feature never reaches the HTML, sitemap, structured data or search index.
//
// Before switching a flag on, re-check every line marked CONFIRM AT RELEASE against what shipped,
// and set releaseDate (YYYY-MM-DD) for the changelog entry.
import { flags } from '../../lib/core.mjs';
import { phone, riskListMock } from '../../lib/mockups.mjs';
import { block } from '../../lib/components.mjs';
import { money } from '../../lib/core.mjs';

export const upcoming = {
  voiceNotes: {
    flag: 'voiceNotes', slug: 'voice-notes', name: 'Voice-note replies', releaseDate: null,
    oneLine: 'Many customers would rather talk than type.',
    section: () => block({
      id: 'voice-notes', title: 'Understands voice notes',
      text: 'Many customers would rather talk than type. When a customer sends a voice note, Selo turns it into text, and the AI answers it like any typed message, with the same guardrails. Your team sees the transcript next to the voice note in the inbox, so nobody has to listen to every message.',
      checks: [
        "Voice notes are transcribed and answered in the customer's language.", // CONFIRM AT RELEASE: supported languages (speech-to-text provider)
        'Long or unclear voice notes go straight to your team.', // CONFIRM AT RELEASE: length limit
        "Voice notes play in the inbox and aren't stored by Selo. They're fetched from WhatsApp when needed.",
      ],
      visual: phone({ title: 'Casa Verde Home', label: 'Example: a voice note is transcribed and answered', messages: [
        { side: 'in', voice: { dur: '0:14', transcript: 'Hi, I ordered a jacket last week, when does it arrive?' }, time: '16:40' },
        { side: 'out', tag: 'AI reply', text: 'Hi Lucas! Your jacket (order #4120) is with the carrier and should arrive on Tuesday.', time: '16:40' },
      ] }),
      reverse: true,
    }),
    homeLine: 'Reads voice notes and photos too.',
    alsoIncluded: { ic: 'mic', text: 'Voice notes transcribed and answered' },
    pricingRow: { label: 'Voice-note replies', values: ['Suggest only', true, true], note: 'Uses the plan’s AI allowance' }, // PLACEHOLDER gating
    faq: { group: 'ai', q: 'Can the AI answer voice notes?', a: 'Yes. Voice notes are turned into text and answered like typed messages; long or unclear ones go to your team.' },
    changelog: { tag: 'New', title: 'The AI inbox understands voice notes: transcribed, answered, and shown with a transcript.' },
  },

  codRiskScoring: {
    flag: 'codRiskScoring', slug: 'cod-risk-scoring', name: 'COD risk scoring', releaseDate: null,
    oneLine: 'Cash-on-delivery orders that are refused at the door cost you shipping both ways.',
    section: () => block({
      id: 'cod-risk', title: 'Fewer failed cash-on-delivery orders',
      text: 'Cash-on-delivery orders that are refused at the door cost you shipping both ways. Selo looks at each new COD order and flags the ones most likely to be refused, so you can confirm them before you ship.',
      checks: [
        'Every COD order gets a risk level: low, medium or high.', // CONFIRM AT RELEASE: signals used and how risk is shown
        "Customers confirm or cancel their COD order with one tap on WhatsApp, before it's packed.",
        'High-risk orders can wait for confirmation, or go to your team to review.',
        'You can offer customers the option to pay online instead of on delivery.', // CONFIRM AT RELEASE: only if the prepaid option ships
        'Gets smarter as it learns from your own delivered and refused orders.', // CONFIRM AT RELEASE
      ],
      visual: `<div style="display:grid;gap:1.25rem;justify-items:center;width:100%">${phone({ title: 'Kora Living', label: 'Example: one-tap cash-on-delivery confirmation', messages: [
        { side: 'out', tag: 'Template', text: `Hi Amara, please confirm your cash-on-delivery order #2207 for ${money(4500, 'KES')}.`, buttons: [{ label: 'Confirm order', tapped: true }, 'Cancel order'], time: '13:05' },
        { side: 'out', text: "Thanks, we're packing it now.", time: '13:06' },
      ] })}${riskListMock()}</div>`,
    }),
    automationRowText: 'When a cash-on-delivery order is placed: asks the customer to confirm with one tap, with risky orders flagged for you.',
    useCaseBullets: ['Risk level on every COD order', 'One-tap confirm or cancel before dispatch'],
    pricingRow: { label: 'COD risk scoring', values: [false, true, true] }, // PLACEHOLDER gating
    faq: { group: 'cod', q: 'How does COD risk scoring work?', a: 'Selo scores each new cash-on-delivery order for the chance it will be refused, and asks the customer to confirm it on WhatsApp before you ship.' }, // CONFIRM AT RELEASE
    changelog: { tag: 'New', title: 'COD risk scoring: risk level on every cash-on-delivery order, with one-tap confirmation on WhatsApp.' },
  },

  addressFixer: {
    flag: 'addressFixer', slug: 'address-fixer', name: 'AI address fixer', releaseDate: null,
    oneLine: 'A missing house number or wrong postal code can turn a sale into a returned parcel.',
    section: () => block({
      id: 'address-fixer', title: 'Catch incomplete addresses before they ship',
      text: "A missing house number or wrong postal code can turn a sale into a returned parcel. Selo checks new orders' delivery addresses and, when something looks incomplete, asks the customer on WhatsApp to confirm or correct it, before you dispatch.",
      checks: [
        'Spots missing details, like house or flat number, landmark or postal code.', // CONFIRM AT RELEASE
        'The customer replies in the chat; your team approves the corrected address.', // CONFIRM AT RELEASE: auto-update of the Shopify order?
        'Available for stores in selected countries first.', // CONFIRM AT RELEASE: country list. Never imply worldwide coverage.
      ],
      visual: phone({ title: 'Casa Verde Home', label: 'Example: the store asks a customer to complete their address', messages: [
        { side: 'out', tag: 'Template', text: "Hi Omar, we're getting your order ready! Your address seems to be missing a flat number. Could you reply with the full address?", time: '10:20' },
        { side: 'in', text: 'Sorry! It’s Flat 4B, 12 Palm Street', time: '10:24' },
        { side: 'out', text: "Thanks, we've updated it.", time: '10:25' },
      ] }),
      reverse: true,
    }),
    useCaseBullets: ['Incomplete addresses fixed over WhatsApp before dispatch'],
    pricingRow: { label: 'AI address fixer', values: [false, true, true] }, // PLACEHOLDER gating
    faq: { group: 'ai', q: 'Which countries does the address fixer support?', a: '[CONFIRM AT RELEASE: list countries.]' },
    changelog: { tag: 'New', title: 'AI address fixer: incomplete delivery addresses confirmed with the customer on WhatsApp.' },
  },

  copilotDailySummary: {
    flag: 'copilotDailySummary', slug: 'copilot-daily-summary', name: 'Copilot daily summary', releaseDate: null,
    oneLine: "Turn on the daily summary and the copilot sends you yesterday's results on WhatsApp.",
    section: () => block({
      id: 'daily-summary', title: 'Your numbers, every morning',
      text: "Turn on the daily summary and the copilot sends you yesterday's results on WhatsApp at the time you choose, in your store's time zone: orders and sales, sales from WhatsApp, campaign results, and chats waiting for your team.",
      checks: [
        'Opt in per number. Each team member chooses whether they get it.',
        "Choose the time it arrives, in your store's time zone.",
        "Includes important alerts too, such as a drop in your WhatsApp number's quality.", // CONFIRM AT RELEASE
        'WhatsApp may charge a small message fee for each summary, billed by Meta.', // CONFIRM AT RELEASE
      ],
      visual: phone({ title: 'Selo Copilot', subtitle: 'Your store · Maple & Oak', copilot: true, label: 'Example: the daily summary message', messages: [
        { side: 'in', whoLabel: 'Copilot', text: `<strong>Yesterday at Maple &amp; Oak</strong>: 52 orders · ${money(4180, 'CAD')} sales (+9%) · 14 orders from WhatsApp · 2 chats waiting for your team.`, time: '08:00' },
      ] }),
      reverse: true,
    }),
    homeLine: 'Or get a summary every morning.',
    pricingRow: { label: 'Copilot daily summary', values: [false, true, true] }, // PLACEHOLDER gating
    faq: { group: 'ai', q: 'Can the copilot send me a daily report?', a: 'Yes. Turn on the daily summary for your number and choose the time. WhatsApp may charge a small fee per message.' },
    changelog: { tag: 'New', title: "Copilot daily summary: yesterday's numbers on WhatsApp at the time you choose." },
  },
};

/** Features whose flag is on. */
export const on = (key) => !!flags[key];
export const enabled = () => Object.values(upcoming).filter((f) => flags[f.flag]);
export const disabled = () => Object.values(upcoming).filter((f) => !flags[f.flag]);
