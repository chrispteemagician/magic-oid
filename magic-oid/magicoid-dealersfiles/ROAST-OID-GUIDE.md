# 🔥 ROAST-OID Deployment Guide

## What You Got:

✅ **index-with-roast.html** - Updated Magic-Oid with ROAST mode
✅ **roast-magic.ts** - API endpoint for roasting magicians

---

## Features Added:

### 1. Mode Toggle
- **🔮 Identify Tricks** (original mode)
- **🔥 ROAST-OID** (new roasting mode)
- Switches colors, text, and icons based on mode

### 2. Camera + Gallery Buttons
- **📷 Take Photo** - Opens camera directly
- **🖼️ Choose from Gallery** - Opens file picker
- Works on both mobile and desktop

### 3. ROAST Mode
- Identifies magician type (Card magician, Kids entertainer, Mentalist, etc.)
- Roasts them with British pub banter
- Keeps under 150 words
- Funny not hurtful

### 4. Rogue's Gallery
- **🎭 View Rogue's Gallery** button after roasting
- Shows all past roasts in a grid
- Stores up to 50 roasts in localStorage
- Each roast shows photo + roast text

### 5. Magician Stereotypes
The roast knows these types:
- Card Magicians (47 Bicycle decks, practices more than talks)
- Children's Entertainers (bright colors, "WHO WANTS TO SEE THE WAND!")
- Mentalists (black turtleneck IS their personality)
- Close-Up (lingering over shoulders, pocket full of props)
- Stage Illusionists (sparkly everything, can't walk without jazz hands)
- Street Magicians (filming everything, "yo check this out")
- Corporate Magicians (one suit, £500 for the same 20-min set)

---

## How to Deploy:

### Step 1: Replace Files

**On GitHub:**
1. Go to your magic-oid repo
2. Replace `index.html` with `index-with-roast.html`
3. Add `api/roast-magic.ts` (create new file in api folder)

**File Structure:**
```
magic-oid/
├── index.html (← replace with index-with-roast.html)
├── api/
│   ├── analyze-magic.ts (already have)
│   └── roast-magic.ts (← NEW FILE)
├── dealers.html (your new dealer page)
└── ...
```

### Step 2: Commit and Push

```bash
git add index.html api/roast-magic.ts
git commit -m "Add ROAST-OID mode with camera buttons and Rogue's Gallery"
git push origin main
```

Vercel will auto-deploy (2 mins).

---

## Testing:

### Test Identify Mode:
1. Go to https://magicoid.vercel.app
2. Default mode is "Identify Tricks"
3. Take photo or upload from gallery
4. Should analyze magic effect normally

### Test ROAST Mode:
1. Click **🔥 ROAST-OID** button
2. UI changes to orange/red theme
3. Text changes to "Upload a Photo of a MAGICIAN"
4. Take photo of yourself or another magician
5. Wait 20 seconds
6. Get roasted with British pub banter!
7. Click **🎭 View Rogue's Gallery** to see all past roasts

---

## Example Roasts:

**Card Magician:**
> 🔥 **ROASTED: Card Magician**
>
> Mate, you've got that look of someone who's practiced the double lift 10,000 times but still can't get a date. I can see the Bicycle deck outline in your pocket from here - let me guess, you've got strong opinions about Erdnase that nobody asked for? That expression says "I know the pass" but your haircut says "I don't know what conditioner is."

**Kids Entertainer:**
> 🔥 **ROASTED: Children's Entertainer**
>
> Bright colors? Check. Forced smile? Check. Look of someone who's said "WHO WANTS TO SEE THE MAGIC WAND!" 4,000 times this year? Absolutely check. Your car boot probably looks like a clown's fever dream mate. And that outfit - you look like if a party city threw up on a magician. The kids love it, your dry cleaner dreads it.

---

## British Banter Style:

The roasts are:
✅ Like mates taking the piss at the pub
✅ Self-deprecating humor magicians use
✅ Funny not genuinely hurtful
✅ References real magician stereotypes
✅ Includes specific observations from the photo

NOT:
❌ American-style mean roasts
❌ Personal attacks
❌ Actually hurtful content

---

## Rogue's Gallery:

**How it works:**
1. Every roast gets saved to localStorage
2. Stores: roast text, photo, timestamp, unique ID
3. Keeps last 50 roasts
4. View anytime by clicking **🎭 View Rogue's Gallery**
5. Grid layout shows all roasts with photos

**Storage key:** `roast_gallery`

---

## Future Enhancements (Optional):

- [ ] Share to Instagram with branded image
- [ ] QR code on share images
- [ ] Export roast as image file
- [ ] Clear gallery button
- [ ] Filter gallery by magician type
- [ ] Social sharing (Twitter, Facebook)

---

## What Works:

✅ Mode switching (Identify ↔ ROAST)
✅ Camera button (opens camera)
✅ Gallery button (opens file picker)
✅ Mobile + desktop compatible
✅ Roast generation (20 second analysis)
✅ Rogue's Gallery storage
✅ View past roasts
✅ Beautiful UI with color themes
✅ British pub banter tone

---

## Deploy and Test!

Replace index.html, add roast-magic.ts, push to GitHub, wait 2 minutes, then go roast some magicians! 🔥🎩

**Ready to launch at Blackpool!**
