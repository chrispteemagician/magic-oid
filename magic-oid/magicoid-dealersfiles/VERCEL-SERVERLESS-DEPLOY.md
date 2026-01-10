# 🎩 Vercel Serverless Dealer System - Deployment Guide

## What Changed:

Converted from Next.js App Router → **Vercel Serverless Functions**

---

## Files to Upload:

### 1. API Functions (Vercel Serverless)
```
api/
├── analyze-magic.ts (already have)
├── roast-magic.ts (NEW - ROAST-OID)
├── dealers-create-checkout.ts (NEW - replaces Next.js route)
└── dealers-process-signup.ts (NEW - replaces Next.js route)
```

### 2. Static HTML Pages
```
dealers.html (updated - fixed API endpoint)
dealers-success.html (NEW - success page)
index.html (replace with index-with-roast.html for ROAST-OID)
```

### 3. Delete These (Breaking Build)
```
❌ api/dealers/ (entire folder - Next.js routes)
```

---

## Package Dependencies Needed:

Your `package.json` needs these:

```json
{
  "dependencies": {
    "stripe": "^14.0.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@vercel/node": "^3.0.0"
  }
}
```

**Update it with:**
```bash
npm install stripe qrcode
npm install --save-dev @vercel/node
```

Then commit the updated `package.json` and `package-lock.json`.

---

## Deployment Steps:

### Step 1: Delete Broken Files

On GitHub, delete:
- `api/dealers/` (entire folder)

### Step 2: Add New Files

Upload to GitHub:
- `api/dealers-create-checkout.ts`
- `api/dealers-process-signup.ts`
- `api/roast-magic.ts`
- `dealers.html` (updated version)
- `dealers-success.html` (new)
- `index.html` (replace with index-with-roast.html)

### Step 3: Update package.json

Add dependencies:
```json
{
  "name": "magic-oid",
  "version": "1.0.0",
  "dependencies": {
    "stripe": "^14.0.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@netlify/functions": "^2.0.0",
    "@vercel/node": "^3.0.0",
    "netlify-cli": "^17.0.0"
  }
}
```

### Step 4: Commit and Push

```bash
git add .
git commit -m "Convert to Vercel serverless + add ROAST-OID"
git push origin main
```

Vercel will auto-deploy in 2 minutes.

---

## Environment Variables (Already Set):

These should already be in Vercel:
- `STRIPE_SECRET_KEY` ✓
- `STRIPE_DEALER_PRICE_ID` ✓
- `NEXT_PUBLIC_BASE_URL` ✓
- `ANTHROPIC_API_KEY` ✓

---

## Testing After Deploy:

### Test ROAST-OID:
1. Go to https://magicoid.vercel.app
2. Click **🔥 ROAST-OID**
3. Take a photo or upload
4. Wait for roast
5. Check Rogue's Gallery

### Test Dealer Signup:
1. Go to https://magicoid.vercel.app/dealers.html
2. Fill out form
3. Use Stripe test card: `4242 4242 4242 4242`
4. Should redirect to dealers-success.html
5. See QR code and dealer info

---

## How It Works:

### Dealer Flow:
```
dealers.html
    ↓ form submit
/api/dealers-create-checkout (Vercel function)
    ↓ creates Stripe session
Stripe Checkout
    ↓ payment success
dealers-success.html
    ↓ calls
/api/dealers-process-signup (Vercel function)
    ↓ generates QR, returns data
Show QR code + referral link
```

### ROAST Flow:
```
index.html (mode: roast)
    ↓ upload photo
/api/roast-magic (Vercel function)
    ↓ Claude Sonnet 4 roasts
Show roast + save to Rogue's Gallery
```

---

## File Structure (Final):

```
magic-oid/
├── api/
│   ├── analyze-magic.ts
│   ├── roast-magic.ts
│   ├── dealers-create-checkout.ts
│   └── dealers-process-signup.ts
├── index.html (with ROAST-OID)
├── dealers.html
├── dealers-success.html
├── package.json (updated)
├── package-lock.json (updated)
└── vercel.json (optional)
```

---

## Vercel Config (Optional)

Create `vercel.json` if you want clean URLs:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

This lets you use `/dealers` instead of `/dealers.html`.

---

## What Happens After Deploy:

✅ Magic-Oid works with ROAST mode
✅ Dealers page works
✅ Stripe checkout works
✅ QR code generation works
✅ Success page shows dealer info

⚠️ **Database NOT set up** - dealer data only logged to console
⚠️ **Email NOT sent** - welcome email only logged to console

For production, you'll need to add:
1. Database (Supabase recommended)
2. Email service (Resend, SendGrid, Postmark)

---

## Quick Deploy Checklist:

- [ ] Delete `api/dealers/` folder
- [ ] Add 4 new API files
- [ ] Add/update HTML files
- [ ] Update package.json
- [ ] Push to GitHub
- [ ] Wait 2 mins
- [ ] Test ROAST-OID
- [ ] Test dealer signup with Stripe test card
- [ ] ✅ DONE!

---

**Ready to deploy! This will fix the build error and get both ROAST-OID and dealers working.** 🎩🔥
