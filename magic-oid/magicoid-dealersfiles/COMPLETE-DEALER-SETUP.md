# 🎩 Magic-Oid Dealer Onboarding - Complete Setup

## TIERED PRICING STRUCTURE

### Tier 1: First 50 Dealers (NOW - Jan 31)
- **£97/year** locked in FOREVER
- Ends: January 31, 2026

### Tier 2: Next 50 Dealers (Feb 1-28)
- **£174/year** locked in FOREVER  
- Through February 2026

### Tier 3: Regular Price (After Feb)
- **£295/year** (best value)
- **OR £49.95/month**

---

## STRIPE SETUP (Step-by-Step)

### 1. Create Products in Stripe Dashboard

Go to: https://dashboard.stripe.com/products (TEST MODE first!)

#### Product 1: Founder Dealer Tier 1
- Name: "Magic-Oid Founder Dealer - Tier 1"
- Description: "First 50 dealers - £97/year locked in forever"
- Price: £97 GBP, Yearly recurring
- **Copy the Price ID**: `price_xxxxx` → Save as `STRIPE_FOUNDER_TIER1_PRICE_ID`

#### Product 2: Founder Dealer Tier 2
- Name: "Magic-Oid Founder Dealer - Tier 2"
- Description: "Next 50 dealers - £174/year locked in forever"
- Price: £174 GBP, Yearly recurring
- **Copy the Price ID**: `price_xxxxx` → Save as `STRIPE_FOUNDER_TIER2_PRICE_ID`

#### Product 3: Regular Annual
- Name: "Magic-Oid Dealer - Annual"
- Description: "Regular annual dealer membership"
- Price: £295 GBP, Yearly recurring
- **Copy the Price ID**: `price_xxxxx` → Save as `STRIPE_REGULAR_ANNUAL_PRICE_ID`

#### Product 4: Regular Monthly
- Name: "Magic-Oid Dealer - Monthly"
- Description: "Regular monthly dealer membership"
- Price: £49.95 GBP, Monthly recurring
- **Copy the Price ID**: `price_xxxxx` → Save as `STRIPE_REGULAR_MONTHLY_PRICE_ID`

### 2. Get API Keys

1. Go to: https://dashboard.stripe.com/apikeys
2. Copy "Secret key" (starts with `sk_test_...` for test mode)
3. Save as `STRIPE_SECRET_KEY`

---

## VERCEL ENVIRONMENT VARIABLES

Add these to Vercel (Settings → Environment Variables):

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...

# Current Active Tier (change manually as tiers sell out)
STRIPE_DEALER_PRICE_ID=price_xxxxx  # Start with Tier 1

# All Price IDs (for future switching)
STRIPE_FOUNDER_TIER1_PRICE_ID=price_xxxxx  # £97
STRIPE_FOUNDER_TIER2_PRICE_ID=price_xxxxx  # £174
STRIPE_REGULAR_ANNUAL_PRICE_ID=price_xxxxx  # £295
STRIPE_REGULAR_MONTHLY_PRICE_ID=price_xxxxx  # £49.95

# Site URL
NEXT_PUBLIC_BASE_URL=https://magicoid.vercel.app

# Claude API (already have)
ANTHROPIC_API_KEY=sk-ant-...
```

---

## SWITCHING TIERS

### When First 50 Sell Out (Jan 31 or earlier):

1. Go to Vercel Environment Variables
2. Change `STRIPE_DEALER_PRICE_ID` to Tier 2 price ID
3. Redeploy site
4. Update landing page copy:
   - Change "Current tier: £97" → "Current tier: £174"
   - Update countdown/urgency messaging

### When Tier 2 Sells Out (End of Feb):

1. Change `STRIPE_DEALER_PRICE_ID` to regular annual price ID
2. Update landing page to show both options (annual + monthly)
3. Remove "Founder" messaging

---

## TRACKING TIER SALES

### Option A: Manual Tracking (Quick)
- Keep a spreadsheet
- After each Stripe notification, add to count
- Update env var when tier fills up

### Option B: Automated (Better)
- Add `tier` field to dealer database
- Count dealers where `tier='tier1'`
- Auto-switch when count >= 50

---

## FILES TO UPDATE

### 1. Dealer Landing Page
**Location**: `app/dealers/page.tsx`
**Replace with**: `dealers-page-updated.tsx`

### 2. Create Checkout Route (Already Have)
**Location**: `app/api/dealers/create-checkout/route.ts`
**Make sure it uses**: `process.env.STRIPE_DEALER_PRICE_ID`

### 3. Success Page (Already Have)
**Location**: `app/dealers/success/page.tsx`

---

## TESTING FLOW

### Test Cards (Stripe Test Mode):

**Success**: 4242 4242 4242 4242
**Decline**: 4000 0000 0000 0002
**Requires 3DS**: 4000 0027 6000 3184

### Test Steps:

1. Go to `/dealers`
2. Fill out form
3. Check "I agree to display QR code"
4. Click submit
5. Use test card on Stripe checkout
6. Should redirect to `/dealers/success`
7. Verify QR code appears
8. Check Stripe dashboard for subscription

---

## GOING LIVE

### 1. Switch to Live Mode

1. Toggle Stripe to "Live mode"
2. Create all 4 products again (in live mode)
3. Get live API keys (start with `sk_live_...`)
4. Update Vercel env vars with LIVE keys

### 2. Test With Real Card

1. Use YOUR card to test (you'll be charged £97)
2. Verify full flow works
3. Cancel your test subscription
4. Get refund from Stripe dashboard

### 3. Launch!

1. Announce to dealers
2. Share `/dealers` link
3. Monitor Stripe for signups
4. Watch tier counts

---

## KUDOS FAMILY BENEFITS

Every dealer who pays £97 gets PRO access to:

### All -Oid Apps:
- Magic-Oid
- Guitar-Oid
- Radi-Oid
- Miniature-Oid
- Designer-Oid
- Watch-Oid (coming)
- Coin-Oid (coming)
- Cannabin-Oid (coming)

### Kudos Family Apps:
- SpicyLister (AI listings)
- SpicyLister Store (sell inventory)
- EntertainCMS (bookings)
- MeshCB (CB radio)
- Van-alyst (vehicle inspection)
- SpicyTasker (task management)
- DnB Santa (video service)

### Dealer Features:
- Custom dealer page
- Referral tracking & QR codes
- Kudos scoring across all apps
- Gift coins to community
- Bridge Walker status
- Multi-account discounts
- Priority support

---

## LAUNCH TIMELINE

### NOW → Jan 31, 2026
- Tier 1: £97/year (First 50)
- URGENCY: "Lock in founder rate before Jan 31"

### Feb 1-28, 2026
- Tier 2: £174/year (Next 50)
- URGENCY: "Last chance for founder pricing"

### March 1, 2026+
- Regular: £295/year or £49.95/month
- MESSAGING: "Regular pricing now in effect"

---

## HORMOZI "$1M OFFER" FORMULA

✅ **Dream Outcome**: Access to ALL -Oids + Kudos Family forever
✅ **Perceived Likelihood**: Other dealers are joining (social proof)
✅ **Time Delay**: Instant access after payment
✅ **Effort & Sacrifice**: Just display QR code (easy!)

**Value Equation**:
- Get: £295 + £49.95/mo worth of apps
- Pay: £97/year (locked forever)
- Savings: £500+ per year
- Condition: Display QR (builds YOUR business)

**Risk Reversal**: 30-day money-back guarantee

---

## NEXT -OIDS TO LAUNCH

Copy/paste this template for:
1. Guitar-Oid dealers (music shops)
2. Cannabin-Oid dealers (dispensaries, 420 shops)
3. Watch-Oid dealers (vintage watch dealers)
4. Coin-Oid dealers (numismatic shops)

Each vertical = New dealer network = More Kudos Family members

---

## YOU'RE READY! 🚀

Deploy → Test → Launch → Change the world x
