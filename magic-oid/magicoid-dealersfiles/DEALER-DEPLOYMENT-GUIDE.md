# 🎩 Dealer Onboarding - Deployment Guide

## What You Have Now:

✅ `/dealers` - Landing page with form
✅ `/dealers/success` - Success page with QR code
✅ `/dealers/[referralCode]` - Dealer profile pages
✅ `/api/dealers/create-checkout` - Initiates Stripe payment (NEW FILE)
✅ `/api/dealers/process-signup` - Creates dealer record after payment

---

## Required Environment Variables:

Create a `.env.local` file (or add to Vercel):

```bash
# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_FOUNDER_PRICE_ID=price_...

# Your site URL
NEXT_PUBLIC_BASE_URL=https://magicoid.vercel.app

# Claude API (already have this)
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Stripe Setup Steps:

### 1. Create Stripe Price

1. Go to https://dashboard.stripe.com/products
2. Click "Add product"
3. Name: "Magic-Oid Founder Dealer"
4. Description: "Annual dealer membership - Blackpool special"
5. Pricing:
   - **Model**: Recurring
   - **Price**: £97
   - **Billing period**: Yearly
6. Save → Copy the **Price ID** (starts with `price_...`)
7. Add to your `.env`: `STRIPE_FOUNDER_PRICE_ID=price_...`

### 2. Get Stripe Secret Key

1. Go to https://dashboard.stripe.com/apikeys
2. Copy "Secret key" (starts with `sk_live_...` for production or `sk_test_...` for testing)
3. Add to your `.env`: `STRIPE_SECRET_KEY=sk_test_...`

**NOTE:** Use test mode first to test the flow!

---

## File Structure:

```
app/
├── dealers/
│   ├── page.tsx                    # Landing page ✓
│   ├── success/
│   │   ├── page.tsx                # Wrapper ✓
│   │   └── DealerSuccessContent.tsx # Success logic ✓
│   └── [referralCode]/
│       └── page.tsx                # Dealer profile ✓
├── api/
│   └── dealers/
│       ├── create-checkout/
│       │   └── route.ts            # 👈 NEW FILE (place this here)
│       └── process-signup/
│           └── route.ts            # ✓
```

---

## Where to Put the New File:

Save `create-checkout-route.ts` as:
```
app/api/dealers/create-checkout/route.ts
```

---

## Dependencies Needed:

```bash
npm install stripe qrcode nanoid
```

Or add to your `package.json`:
```json
{
  "dependencies": {
    "stripe": "^14.0.0",
    "qrcode": "^1.5.3",
    "nanoid": "^5.0.0"
  }
}
```

---

## Testing the Flow:

### 1. Test Mode (Safe - No Real Money)

1. Set `STRIPE_SECRET_KEY` to test key (starts with `sk_test_`)
2. Create a test price in Stripe dashboard (set to test mode)
3. Go to `/dealers`
4. Fill out form
5. Click "Become a Founder Dealer"
6. Should redirect to Stripe checkout
7. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
8. Complete payment
9. Should redirect to `/dealers/success`
10. See QR code and dealer info

### 2. Production Mode

1. Switch to live Stripe keys
2. Create live price (£97/year)
3. Test with real card (charge yourself £97 to test)
4. Verify everything works
5. Then promote to dealers!

---

## What Still Needs Database:

Right now, the code has `// TODO: Save to database` comments. You need to:

1. **Choose a database:**
   - Supabase (easiest, has free tier)
   - PlanetScale (MySQL)
   - Vercel Postgres
   - Firebase

2. **Create `dealers` table** with these fields:
   - id, stripeCustomerId, stripeSubscriptionId
   - dealerName, contactName, email, phone
   - website, description, city, country
   - socials (JSON), payoutMethod
   - referralCode, referralUrl, qrImageDataUrl
   - kudos (number), status, createdAt

3. **Replace the `// TODO` comments** with actual database calls

---

## For Blackpool (Quick & Dirty):

If you don't have time for a database before Blackpool:

1. Log everything to a Google Sheet or Airtable
2. Manually create dealer pages for each signup
3. Send QR codes via email
4. Track kudos in a spreadsheet

After Blackpool, properly set up the database.

---

## Need Help?

If you get stuck:
1. Check Vercel deployment logs
2. Check Stripe dashboard for webhook events
3. Ask me! 🎩
