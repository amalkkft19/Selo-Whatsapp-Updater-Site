// Chat mockup scripts (brief section 6). Fictional, international sample content.
import { phone } from '../../lib/mockups.mjs';
import { money } from '../../lib/core.mjs';

export const scriptA = () => phone({
  title: 'Northwind Apparel', label: 'Example: order update and a customer question answered by AI',
  messages: [
    { side: 'out', tag: 'Template', text: 'Hi Sofia, your order #1048 is on its way! 🚚 Track it here: track.example/AB12345', buttons: [{ label: 'Track order', icon: 'external-link' }], time: '10:02' },
    { side: 'in', text: 'Great, when will it arrive?', time: '10:05' },
    { side: 'out', tag: 'AI reply', text: "It's with the carrier and expected on Thursday. I'll be here if you need anything else.", time: '10:05' },
  ],
});

export const scriptB = () => phone({
  title: 'Maple & Oak', label: 'Example: abandoned cart reminder',
  messages: [
    { side: 'out', tag: 'Template', text: "Hi Daniel, you left the Canvas Weekender Bag in your cart. It's still available. Complete your order here:", buttons: [{ label: 'Return to cart', icon: 'shopping-cart' }], time: '18:30' },
    { side: 'in', text: 'Is there free shipping?', time: '18:41' },
    { side: 'out', tag: 'AI reply', text: `Yes, orders over ${money(60, 'EUR', { digits: 0 })} ship free. Your cart is ${money(79, 'EUR', { digits: 0 })}, so shipping is on us.`, time: '18:41' },
  ],
});

export const scriptC = () => phone({
  title: 'Northwind Apparel', label: 'Example: ordering in the chat with a Confirm button and checkout link',
  messages: [
    { side: 'in', text: "Do you have the blue linen shirt in M? I'd like 2", time: '14:12' },
    { side: 'out', tag: 'AI reply', text: `Yes! Here's your order:\n<strong>2 × Blue Linen Shirt (M)</strong> at ${money(45, 'USD')} each.\nTotal: ${money(90, 'USD')} + shipping.`, buttons: [{ label: 'Confirm order', tapped: true }, 'Cancel'], time: '14:12' },
    { system: 'Customer tapped “Confirm order”' },
    { side: 'out', text: "Here's your checkout link with your cart ready:", buttons: [{ label: 'Checkout', icon: 'shopping-bag' }], time: '14:13' },
  ],
});

export const scriptD = () => phone({
  title: 'Sakura Tea Co.', label: 'Example: product carousel campaign',
  messages: [
    { side: 'out', tag: 'Template', text: "New arrivals are here, Aiko! Swipe to see this week's picks:", time: '11:00',
      carousel: [
        { name: 'Sencha Gift Tin', price: money(2400, 'JPY'), icon: 'coffee', bg: '#D9F2E3' },
        { name: 'Matcha Starter Set', price: money(4800, 'JPY'), icon: 'leaf', bg: '#E8F5D0' },
        { name: 'Hojicha Blend', price: money(1900, 'JPY'), icon: 'cup-soda', bg: '#F3E3D3' },
      ] },
  ],
});

export const scriptE = () => phone({
  title: 'Selo Copilot', subtitle: 'Your store · Northwind Apparel', copilot: true,
  label: "Example: merchant texts the copilot for today's sales and approves a campaign draft",
  messages: [
    { side: 'out', whoLabel: 'Merchant', text: 'How were sales today?', time: '17:20' },
    { side: 'in', whoLabel: 'Copilot', text: `Today so far: 38 orders, ${money(3420.5, 'USD')} in sales (+12% vs yesterday). 9 of those orders came from WhatsApp.`, time: '17:20' },
    { side: 'out', whoLabel: 'Merchant', text: 'Send the Black Friday offer to VIPs at 7pm tomorrow', time: '17:22' },
    { side: 'in', whoLabel: 'Copilot', text: `<strong>Campaign draft</strong>: nothing is sent until you tap Approve.\nTo: Segment VIP customers (412 opted-in customers)\nSend: Fri, 7:00 PM store time\nDiscount: BF25, 25% off\nEstimated cost: ${money(24.7, 'USD')}`, buttons: [{ label: 'Approve', tapped: true }, 'Cancel'], time: '17:22' },
    { side: 'in', whoLabel: 'Copilot', text: '✅ Approved: scheduled for Fri 7:00 PM, to 412 customers.', time: '17:23' },
  ],
});

export const photoChat = () => phone({
  title: 'Lumen Beauty', label: 'Example: customer sends a photo of a damaged item and a return case opens',
  messages: [
    { side: 'in', photo: 'Photo of a cracked serum bottle', text: 'My serum arrived broken 😞', time: '09:14' },
    { side: 'out', tag: 'AI reply', text: "I'm sorry about that, Amara. I've opened a return case for order #3311 and a member of our team will reply shortly.", time: '09:14' },
  ],
});

export const notFoundChat = (links) => phone({
  title: 'Selo', label: 'A customer asks where the page went', animate: true,
  messages: [
    { side: 'in', text: "Where's this page? 🤔", time: '12:00' },
    { side: 'out', tag: 'AI reply', text: `It may have moved. Try one of these:\n${links}`, time: '12:00' },
  ],
});
