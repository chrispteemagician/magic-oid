import type { VercelRequest, VercelResponse } from '@vercel/node';
const Stripe = require('stripe');
const QRCode = require('qrcode');

// Simple ID generator (replace nanoid)
function generateId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

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
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'No session ID provided' });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://magicoid.vercel.app';

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    });

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Parse metadata
    const metadata = session.metadata;
    
    // Generate referral code
    const referralCode = `bw_${generateId(8)}`;
    const referralUrl = `${baseUrl}/r/${referralCode}`;

    // Generate QR Code as data URL
    const qrDataUrl = await QRCode.toDataURL(referralUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: '#5B21B6', // purple-800
        light: '#FFFFFF'
      }
    });

    // Create dealer data object
    const dealerData = {
      dealerName: metadata.dealerName,
      contactName: metadata.contactName,
      email: metadata.email,
      phone: metadata.phone || null,
      website: metadata.website,
      description: metadata.description,
      city: metadata.city,
      country: metadata.country,
      socials: metadata.socials || null,
      payoutMethod: metadata.payoutMethod,
      
      // Referral & QR
      referralCode,
      referralUrl,
      qrImageDataUrl: qrDataUrl,
      
      // Stripe IDs
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      
      // Status
      kudos: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    // TODO: Save to database here
    // For now, just log it
    console.log('Created dealer:', dealerData);

    // TODO: Send welcome email here
    console.log('Send welcome email to:', dealerData.email);

    // Return dealer info for success page
    return res.status(200).json({
      success: true,
      dealer: {
        dealerName: dealerData.dealerName,
        pageUrl: `${baseUrl}/dealers/${referralCode}`,
        referralUrl: dealerData.referralUrl,
        qrImageDataUrl: dealerData.qrImageDataUrl
      }
    });

  } catch (error: any) {
    console.error('Process signup error:', error);
    return res.status(500).json({ error: error.message || 'Failed to process signup' });
  }
}
