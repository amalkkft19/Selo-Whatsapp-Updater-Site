// Shared content: sample testimonials (brief 7.4). Always visibly labelled until real,
// permission-cleared quotes replace them.
import { t } from '../../lib/core.mjs';
import { sampleLabel } from '../../lib/components.mjs';

export const testimonialData = [
  { text: 'Our “where is my order?” messages dropped as soon as shipping updates went out on WhatsApp.', who: 'Owner, apparel store, Spain' },
  { text: 'The abandoned-cart reminder paid for the app in the first week.', who: 'Founder, beauty brand, Australia' },
  { text: 'I check sales from my phone every evening with the copilot.', who: 'Owner, home goods store, Canada' },
];

export function testimonials() {
  return testimonialData.map((q) => `<figure class="card quote reveal">${sampleLabel(t('common.sampleTestimonial'))}<blockquote><p>“${q.text}”</p></blockquote><figcaption>Sample · ${q.who}</figcaption></figure>`).join('');
}
