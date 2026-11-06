// Legal pages (brief 5.19). Headed sections only. ALL text is a PLACEHOLDER
// and must be written or reviewed by a lawyer before launch.
import { company } from '../../lib/core.mjs';
import { crumbs } from '../../lib/components.mjs';

const LAST_UPDATED = '2026-11-06'; // PLACEHOLDER

const docs = [
  { slug: 'privacy', title: 'Privacy policy', desc: 'How Selo processes personal data of merchants, their customers and website visitors.', sections: [
    'Who we are', 'Data we process', ['Merchant account data', 'Store customer data received from Shopify and WhatsApp', 'Website visitor data'], 'Purposes', 'Legal bases', 'Sub-processors', 'International transfers', 'Retention',
    'Your rights', ['GDPR and UK GDPR', 'CCPA/CPRA', 'LGPD', 'Other laws'], 'Cookies', 'Contact'] },
  { slug: 'terms', title: 'Terms of service', desc: 'The terms that apply when you use the Selo Shopify app.', sections: [
    'Service description', 'Accounts and Shopify billing', 'Acceptable use', 'WhatsApp/Meta and Shopify terms apply', 'AI features', ['AI outputs need review', 'You are responsible for messages you send'], 'Fees', 'Termination', 'Liability', 'Governing law'] },
  { slug: 'dpa', title: 'Data processing addendum', desc: 'Selo as processor of store customer data: sub-processors, security, requests and breach notification.', sections: [
    'Selo as processor for store customer data', 'Sub-processors', 'Security measures', 'Data subject requests', 'Breach notification', 'Standard contractual clauses'] },
  { slug: 'cookies', title: 'Cookie policy', desc: 'The cookies and similar storage this website uses, and how to change your choices.', sections: [
    'What cookies are', 'Categories', ['Necessary', 'Analytics', 'Marketing'], 'Cookies we use', 'Changing your choices'], cookieTable: true },
  { slug: 'acceptable-use', title: 'Acceptable use (messaging rules)', desc: 'Rules for sending WhatsApp messages with Selo: consent, opt-outs and prohibited content.', sections: [
    'Consent required for marketing', 'Honour opt-outs', 'Follow WhatsApp Business Messaging and Commerce policies', 'Prohibited content and products', 'No buying contact lists'] },
];

const id = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function legalPage(d) {
  const top = d.sections.filter((s) => typeof s === 'string');
  let html = '';
  d.sections.forEach((s) => {
    if (typeof s === 'string') html += `<h2 id="${id(s)}">${s}</h2><p class="muted">[PLACEHOLDER: legal text to be written or reviewed by a lawyer.]</p>`;
    else html += s.map((x) => `<h3>${x}</h3><p class="muted">[PLACEHOLDER]</p>`).join('');
  });
  if (d.cookieTable) {
    html += `<div class="table-wrap" style="margin-top:1rem"><table class="reflow"><caption class="sr-only">Cookies and storage used by this website</caption>
<thead><tr><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr></thead><tbody>
<tr><th scope="row">selo-consent</th><td data-label="Category">Necessary</td><td data-label="Purpose">Remembers your cookie choices</td><td data-label="Duration">12 months</td></tr>
<tr><th scope="row">selo-theme</th><td data-label="Category">Necessary</td><td data-label="Purpose">Remembers light or dark mode</td><td data-label="Duration">Until cleared</td></tr>
<tr><th scope="row">selo-announce-dismissed</th><td data-label="Category">Necessary</td><td data-label="Purpose">Hides an announcement you closed</td><td data-label="Duration">Until cleared</td></tr>
<tr><th scope="row">Analytics provider</th><td data-label="Category">Analytics</td><td data-label="Purpose">[PLACEHOLDER: list once the analytics provider is chosen]</td><td data-label="Duration">[PLACEHOLDER]</td></tr>
</tbody></table></div>`;
  }
  const route = `/legal/${d.slug}`;
  return {
    route, title: `${d.title} | Selo`.slice(0, 60), description: d.desc, trail: [['Legal', '/legal/privacy'], [d.title, route]], noCta: true, priority: 0.3,
    body: `<section class="page-hero"><div class="container">${crumbs([['Legal', '/legal/privacy'], [d.title, route]])}<h1 style="font-size:clamp(2rem,1.5rem + 2vw,2.75rem)">${d.title}</h1>
<p class="small">Last updated: <time datetime="${LAST_UPDATED}">${new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(LAST_UPDATED + 'T12:00:00Z'))}</time></p></div></section>
<section class="section" style="padding-top:2rem"><div class="container legal-layout">
  <nav class="toc" aria-label="On this page"><strong>On this page</strong><ol>${top.map((s) => `<li><a href="#${id(s)}">${s}</a></li>`).join('')}</ol></nav>
  <article class="prose">
    <div class="placeholder-box"><strong>PLACEHOLDER:</strong> all legal text must be written or reviewed by a lawyer before launch. Contact: <a href="mailto:${company.emails.privacy}">${company.emails.privacy}</a> · ${company.legalName} · Company number / VAT: ${company.companyNumber}</div>
    ${html}
  </article>
</div></section>`,
  };
}

export default function legal() { return docs.map(legalPage); }
