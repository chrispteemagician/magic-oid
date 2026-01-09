import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate required fields
    const required = ['dealerName', 'contactName', 'email', 'website', 'description', 'city', 'country', 'payoutMethod']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_DEALER_PRICE_ID!, // £97/year
        quantity: 1
      }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dealers/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dealers?canceled=1`,
      customer_email: body.email,
      metadata: {
        dealerName: body.dealerName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone || '',
        website: body.website,
        description: body.description,
        city: body.city,
        country: body.country,
        socials: body.socials || '',
        payoutMethod: body.payoutMethod
      }
    })

    return NextResponse.json({ url: session.url })
    
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 })
  }
}
