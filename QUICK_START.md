# ⚡ QUICK START - Deploy in 5 Minutes

## Step 1: Get Your Gemini API Key (1 min)

1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key (starts with `AIzaSy...`)

**YOU ALREADY HAVE GOOGLE CREDITS!** ✅

---

## Step 2: Upload to GitHub (2 mins)

```bash
# In your magic-oid folder:
git init
git add .
git commit -m "Magic-Oid v2.0 - Ready to deploy"
git remote add origin https://github.com/chrispteemagician/magic-oid.git
git push -u origin main
```

---

## Step 3: Deploy to Vercel (1 min)

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your `magic-oid` repo
4. Click **"Deploy"**

Vercel auto-deploys! ✅

---

## Step 4: Add Environment Variables (1 min)

In Vercel dashboard → Settings → Environment Variables:

```
GEMINI_API_KEY = AIzaSyXXXXXXXXXXXXXXXXX (from Step 1)
STRIPE_SECRET_KEY = sk_test_XXXXXXXXXX (you already have)
STRIPE_DEALER_PRICE_ID = price_XXXXXXXXXX (you already have)
NEXT_PUBLIC_BASE_URL = https://magicoid.vercel.app (or your domain)
```

Click **"Save"** → **"Redeploy"**

---

## Step 5: TEST! (30 seconds)

Go to your site:
- Upload magic trick photo → Get analysis ✅
- Click ROAST-OID → Roast a magician ✅
- Go to /dealers → Test with card 4242 4242 4242 4242 ✅

---

## ✅ YOU'RE LIVE!

**No database needed yet** - dealers log to console for now.

Want to add Supabase later? See README.md Section: "Optional: Supabase Database Setup"

---

## 🚨 If Something Breaks:

1. Check Vercel logs: Deployments → View Function Logs
2. Verify Gemini key works: https://makersuite.google.com/app/apikey
3. Check browser console (F12)

---

**READY FOR BLACKPOOL!** 🎩🔥
