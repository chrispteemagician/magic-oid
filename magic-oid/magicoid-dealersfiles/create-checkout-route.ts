import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    // Validate required fields
    if (!formData.dealerName || !formData.email || !formData.contactName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_FOUNDER_PRICE_ID!, // £97/year price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dealers/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dealers?canceled=1`,
      
      // Store form data in metadata so we can retrieve it after payment
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
        payoutMethod: formData.payoutMethod,
      },
      
      // Pre-fill customer email
      customer_email: formData.email,
    })

    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    console.error('Create checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
