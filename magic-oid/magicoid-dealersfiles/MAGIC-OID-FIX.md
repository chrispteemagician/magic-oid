# 🎩 Magic-Oid Fix - Switch from Gemini to Claude

## What Changed
Converted Magic-Oid from Google Gemini → Anthropic Claude (same as working Radi-Oid)

## Steps to Deploy (5 minutes)

### 1. Replace the API File
Copy the new `analyze-magic.ts` file to your repo:
```
magic-oid/api/analyze-magic.ts
```
(Replace the existing one)

### 2. Update Vercel Environment Variable

1. Go to https://vercel.com/dashboard
2. Select your Magic-Oid project
3. Go to **Settings** → **Environment Variables**
4. **Delete** `GEMINI_API_KEY` (if it exists)
5. **Add new variable**:
   - Key: `ANTHROPIC_API_KEY`
   - Value: (your Claude API key - same one as Radi-Oid)
   - Environment: Production, Preview, Development (check all)
6. Click **Save**

### 3. Commit & Push
```bash
cd magic-oid
git add api/analyze-magic.ts
git commit -m "Fix: Switch from Gemini to Claude API"
git push
```

Vercel will auto-deploy (takes ~2 minutes)

### 4. Test!
1. Go to https://magicoid.vercel.app
2. Upload a magic trick photo
3. Click "Identify This Effect"
4. 🎉 Should work now!

## Why This Fixes It
- Radi-Oid works ✓ (uses Claude)
- Magic-Oid broken ✗ (was using Gemini with billing issues)
- Now both use same API = both work ✓

## Cost
Same as before - ~£0.01-0.03 per analysis with Claude

## If You Get Stuck
Check Vercel function logs:
- Vercel Dashboard → Your Project → Functions → analyze-magic → Logs

---

**Ready for Blackpool! 🎩**
