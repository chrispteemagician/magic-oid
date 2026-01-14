const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_DEALER_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.URL}/dealers-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/dealers.html`,
    });
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};