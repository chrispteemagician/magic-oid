import type { VercelRequest, VercelResponse } from '@vercel/node';
const Stripe = require('stripe');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body;

    // Validate required fields
    const required = ['dealerName', 'contactName', 'email', 'website', 'description', 'city', 'country', 'payoutMethod'];
    for (const field of required) {
      if (!formData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePriceId = process.env.STRIPE_DEALER_PRICE_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://magicoid.vercel.app';

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    if (!stripePriceId) {
      throw new Error('STRIPE_DEALER_PRICE_ID not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: stripePriceId,
          quantity: 1
        }
      ],
      success_url: `${baseUrl}/dealers-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dealers.html?canceled=1`,
      customer_email: formData.email,
      metadata: {
        dealerName: formData.dealerName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || '',
        website: formData.website,
        description: formData.description,
        city: formData.city,
        country: formData.country,
        socials: formData.socials || '',
        payoutMethod: formData.payoutMethod
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
}
