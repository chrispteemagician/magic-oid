# 🎩 Magic-Oid v2.0 - Complete Package

**AI-Powered Magic Effect Identification + ROAST-OID**

Built by **Chris P Tee** - Magic Circle Magician - UK Children's Entertainer of the Year 2018

---

## ✨ What's Included:

✅ **Magic Effect Identification** - Upload tricks, get detailed analysis
✅ **ROAST-OID** - Roast magicians with British pub banter
✅ **Dealer Program** - £97/£174/£295 tiered pricing + Stripe checkout
✅ **Rogue's Gallery** - Save and view all roasts
✅ **Camera + Gallery Buttons** - Mobile-friendly photo uploads
✅ **QR Code Generation** - Auto-generated for dealer referrals
✅ **Pro Mode** - Book references, Amazon affiliate links

---

## 🚀 Quick Deploy (5 Minutes):

### 1. Upload to GitHub

Create new repo or update existing:
```bash
git init
git add .
git commit -m "Magic-Oid v2.0 with ROAST-OID"
git remote add origin https://github.com/YOUR_USERNAME/magic-oid.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Import your GitHub repo
4. Vercel auto-detects settings
5. Click **"Deploy"**

Done! Site live in 2 minutes.

---

## 🔑 Environment Variables (REQUIRED):

Go to Vercel → Project Settings → Environment Variables

### Essential:
```bash
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXX
STRIPE_DEALER_PRICE_ID=price_XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://your-site.vercel.app
```

### Get Your Keys:

**Gemini API Key** (FREE - You have credits!):
1. Go to: https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and paste into Vercel

**Stripe Keys** (Already have these):
- Test mode: `sk_test_...`
- Live mode: `sk_live_...`

---

## 📦 Dependencies:

Already in `package.json`:
```json
{
  "dependencies": {
    "stripe": "^14.0.0",
    "qrcode": "^1.5.3"
  }
}
```

Install locally (if testing):
```bash
npm install
```

Vercel installs automatically on deploy.

---

## 🗂️ File Structure:

```
magic-oid/
├── api/
│   ├── analyze-magic.ts          # Effect identification (Gemini)
│   ├── roast-magic.ts             # ROAST-OID (Gemini)
│   ├── dealers-create-checkout.ts # Stripe checkout
│   └── dealers-process-signup.ts  # QR generation
├── index.html                     # Main app (with ROAST mode)
├── dealers.html                   # Dealer signup page
├── dealers-success.html           # Post-payment success
├── package.json                   # Dependencies
├── vercel.json                    # Config
├── .env.example                   # Example env vars
└── README.md                      # This file
```

---

## 🧪 Testing:

### Test Magic Identification:
1. Go to your site
2. Upload photo of magic trick
3. Wait 15-20 seconds
4. Get detailed analysis

### Test ROAST-OID:
1. Click **🔥 ROAST-OID** button
2. Upload photo of magician
3. Get British pub-banter roast
4. View **🎭 Rogue's Gallery**

### Test Dealer Signup:
1. Go to `/dealers`
2. Fill out form
3. Use Stripe test card: `4242 4242 4242 4242`
4. Should redirect to success page
5. See QR code and referral link

---

## 💾 Optional: Supabase Database Setup

**You DON'T need this to launch** - the app works without it.

Dealers are currently just logged to console. To save them permanently:

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create new project (FREE tier works)
3. Wait 2 minutes for setup

### Step 2: Create Database Table

Go to SQL Editor, run this:

```sql
create table dealers (
  id uuid default gen_random_uuid() primary key,
  dealer_name text not null,
  contact_name text not null,
  email text not null unique,
  phone text,
  website text not null,
  description text not null,
  city text not null,
  country text not null,
  socials text,
  payout_method text not null,
  
  -- Referral & QR
  referral_code text not null unique,
  referral_url text not null,
  qr_image_data_url text not null,
  
  -- Stripe
  stripe_customer_id text,
  stripe_subscription_id text,
  
  -- Status
  kudos integer default 0,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS (Row Level Security)
alter table dealers enable row level security;

-- Allow reading dealers (for dealer pages)
create policy "Dealers are viewable by everyone"
  on dealers for select
  using (true);

-- Index for fast referral code lookups
create index idx_dealers_referral_code on dealers(referral_code);
```

### Step 3: Add Environment Variables

In Vercel, add:
```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (secret!)
```

Get these from: Supabase → Project Settings → API

### Step 4: Update `dealers-process-signup.ts`

Add this at the top:
```typescript
import { createClient } from '@supabase/supabase-js';
```

Replace the `// TODO: Save to database` section:
```typescript
// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Save dealer to database
const { data: dealer, error } = await supabase
  .from('dealers')
  .insert([dealerData])
  .select()
  .single();

if (error) {
  throw new Error('Failed to save dealer: ' + error.message);
}
```

Install Supabase package:
```bash
npm install @supabase/supabase-js
```

Push to GitHub, Vercel redeploys automatically.

### Step 5: Create Dealer Pages (Optional)

Create `dealers/[referralCode]/page.tsx` for dynamic dealer pages:
```typescript
export default async function DealerPage({ params }) {
  const { referralCode } = params;
  
  // Fetch dealer from Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  
  const { data: dealer } = await supabase
    .from('dealers')
    .select('*')
    .eq('referral_code', referralCode)
    .single();
  
  if (!dealer) return <div>Dealer not found</div>;
  
  return (
    <div>
      <h1>{dealer.dealer_name}</h1>
      <p>{dealer.description}</p>
      <a href={dealer.website}>Visit Website</a>
      <p>Kudos: {dealer.kudos}</p>
    </div>
  );
}
```

---

## 🔧 Troubleshooting:

### Build Fails:
- Check you deleted old `api/dealers/` Next.js routes
- Make sure `package.json` has stripe + qrcode
- Verify no TypeScript errors

### API Errors:
- Check `GEMINI_API_KEY` is set in Vercel
- Test key works: https://makersuite.google.com/app/apikey
- Check browser console for errors

### Stripe Checkout Fails:
- Verify `STRIPE_SECRET_KEY` is test key (starts with `sk_test_`)
- Check `STRIPE_DEALER_PRICE_ID` matches Stripe dashboard
- Make sure `NEXT_PUBLIC_BASE_URL` is correct

### Images Not Uploading:
- Check file size under 5MB
- Verify JPG/PNG/WebP format
- Test on mobile vs desktop

---

## 🎯 Launch Checklist:

Before Blackpool (Feb 19-22, 2026):

- [ ] Deploy to Vercel
- [ ] Test Magic Identification
- [ ] Test ROAST-OID
- [ ] Test dealer signup with test card
- [ ] Switch to Stripe LIVE keys
- [ ] Update `NEXT_PUBLIC_BASE_URL` to real domain
- [ ] Print QR codes for first 10 dealers
- [ ] Create Instagram story template
- [ ] Set up email welcome sequence (optional)
- [ ] Add Google Analytics (optional)
- [ ] Test on iPhone + Android

---

## 📊 Pricing Strategy:

**Tier 1**: £97/year FOREVER - First 50 dealers (ends Jan 31)
**Tier 2**: £174/year FOREVER - Next 50 dealers (Feb only)
**Tier 3**: £295/year OR £49.95/month - Regular pricing

**Revenue Targets**:
- 50 x £97 = £4,850 (Tier 1)
- 50 x £174 = £8,700 (Tier 2)
- 100 x £295 = £29,500 (Regular)
**Total Year 1**: £43,050

---

## 🌍 World Domination Plan:

This same codebase works for ALL -Oid apps:
- **Magic-Oid** (this one)
- **Guitar-Oid** (vintage guitars)
- **Radi-Oid** (CB radios)
- **Cannabin-Oid** (420 community)
- **Watch-Oid** (vintage watches)
- **Coin-Oid** (numismatics)

Just change:
1. Expert prompts
2. Branding colors
3. Domain name

**Copy/paste empire!** 🚀

---

## 📞 Support:

Built by Chris P Tee
- Website: https://comedymagic.co.uk
- Kudos: https://feelfamous.co.uk
- Email: hello@comedymagic.co.uk

---

## 📄 License:

See LICENSE.txt

---

**GO FORTH AND DOMINATE THE WORLD THROUGH KINDNESS!** 🎩💚
