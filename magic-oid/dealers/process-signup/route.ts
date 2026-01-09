import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import QRCode from 'qrcode'
import { nanoid } from 'nanoid'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

// Helper to send email (you can use Resend, SendGrid, etc.)
async function sendWelcomeEmail(dealer: any) {
  // TODO: Implement with your email provider
  // For now, just log it
  console.log('Send welcome email to:', dealer.email)
  console.log('Referral URL:', dealer.referralUrl)
  console.log('QR Code:', dealer.qrImageDataUrl)
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'No session ID provided' }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Check if dealer already exists (prevent duplicate processing)
    // TODO: Add database check here
    // const existing = await db.dealers.findOne({ stripeSessionId: sessionId })
    // if (existing) return NextResponse.json(existing)

    // Generate referral code
    const referralCode = `bw_${nanoid(8)}`
    const referralUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${referralCode}`

    // Generate QR Code
    const qrDataUrl = await QRCode.toDataURL(referralUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: '#5B21B6', // purple-800
        light: '#FFFFFF'
      }
    })

    // Parse metadata
    const metadata = session.metadata!
    
    // Create dealer record
    const dealer = {
      id: nanoid(),
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      stripeSessionId: sessionId,
      
      // Basic info
      dealerName: metadata.dealerName,
      contactName: metadata.contactName,
      email: metadata.email,
      phone: metadata.phone || null,
      website: metadata.website,
      description: metadata.description,
      city: metadata.city,
      country: metadata.country,
      socials: metadata.socials ? JSON.parse(metadata.socials) : null,
      payoutMethod: metadata.payoutMethod,
      
      // Referral & kudos
      referralCode,
      referralUrl,
      qrImageDataUrl: qrDataUrl,
      kudos: 0,
      
      // Status
      status: 'active',
      createdAt: new Date().toISOString()
    }

    // TODO: Save to your database
    // await db.dealers.insert(dealer)
    console.log('Created dealer:', dealer)

    // Send welcome email
    await sendWelcomeEmail(dealer)

    return NextResponse.json({
      success: true,
      dealer: {
        dealerName: dealer.dealerName,
        pageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dealers/${referralCode}`,
        referralUrl: dealer.referralUrl,
        qrImageDataUrl: dealer.qrImageDataUrl
      }
    })

  } catch (error: any) {
    console.error('Process signup error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
