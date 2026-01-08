# 🎩 Magic-Oid - Your Magic Effect Identification Expert

AI-powered magic effect and illusion identification tool built by a Magic Circle magician with 30+ years experience.

## ⚠️ License & Commercial Use

**This software is proprietary and protected by copyright.**

✅ **What you CAN do:**
- View the code to learn and study the architecture
- Deploy for personal or educational use (non-commercial)
- Reference this work with proper attribution

❌ **What you CANNOT do:**
- Create competing identification apps using this code
- Use the expert prompts or knowledge bases commercially
- Remove copyright notices or attribution
- Deploy as a commercial service without licensing

📧 **For commercial licensing inquiries:** Contact via chrisptee.com

**See [LICENSE.txt](LICENSE.txt) for full terms.**

---

## What It Does

Upload a photo or screenshot of a magic effect, prop, or performance, and Magic-Oid will:

### FREE Features (Forever)
- **Identify the effect** - Name, type, and effect description
- **Assess skill level** - Beginner, Intermediate, Advanced, or Expert
- **Technical overview** - References sleights and techniques by name (e.g., "uses a riffle force")
- **Learning guidance** - Book recommendations and prerequisite skills
- **Historical context** - Who performed it famously, when it was created
- **Performance tips** - Venue suitability and presentation ideas
- **Unlimited analyses** - No limits, no trials, genuinely free

**Note**: Uses standard magic terminology (palms, forces, controls, glimpses) - this is how magicians communicate and find resources.

### PRO Features (£4.95/month Early Adopter)
- **Historical context & origins** - Who created it, when, why it matters
- **Technical breakdown** - Using proper magic terminology (Tenkai palm, riffle force, Elmsley count, glimpse, etc.)
- **Book references** - Specific chapters and pages in magic literature
- **Amazon links** - Direct purchase links to books and props
- **Performance guidance** - Patter, timing, presentation angles
- **Prerequisite skills** - What to master first with book references
- **Related effects** - Similar effects and variations to explore
- **Works on ALL -Oid apps** - Guitar-Oid, Radi-Oid, Miniature-Oid, etc.

**Note**: Pro features use standard magic terminology and reference published magic books. As the saying goes, "If you want to hide a method, write it in a book" - magic books are educational resources for magicians, not exposure.

## Tech Stack

- **Frontend**: React 18 (CDN, no build process)
- **Backend**: Vercel serverless functions
- **AI**: Claude Sonnet 4 (Anthropic API)
- **Storage**: localStorage (no database)
- **Deployment**: Vercel (free tier)

## Knowledge Base Highlights

### Categories Covered
- Card Magic (forces, controls, flourishes, packet tricks)
- Coin Magic (palming, vanishes, productions, penetrations)
- Mentalism (mind reading, predictions, psychological principles)
- Close-Up, Parlor, and Stage Magic
- Classic Props (Svengali Deck, Thumb Tip, IT, Shell Coins)

### Classic Effects Known
- Ambitious Card
- Cups & Balls
- Ring & String
- Torn & Restored
- Levitation
- Productions
- Card to Wallet
- Linking Rings
- French Drop
- Invisible Deck
- And hundreds more!

### Book References
- "Royal Road to Card Magic" by Hugard & Braue
- "Mark Wilson's Complete Course in Magic"
- "Card College" series by Giobbi
- "Expert at the Card Table" by S.W. Erdnase
- "Modern Coin Magic" by J.B. Bobo
- "Tarbell Course in Magic" (8 volumes)
- "Expert Card Technique" by Hugard & Braue
- "Dai Vernon's Revelations"

## Deployment Instructions

### Prerequisites
- Vercel account (free)
- Anthropic API key (from https://console.anthropic.com)

### Steps

1. **Clone or download** this project (for personal/educational use only)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Vercel**:
   - Push to GitHub or deploy directly
   - Connect to Vercel
   - Import your repository

4. **Add environment variable** in Vercel:
   - Go to Project Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`

5. **Deploy**!
   - Vercel will auto-deploy
   - Your site will be live at `https://[your-project].vercel.app`

### Local Testing (Optional)

```bash
npm install
vercel dev
```

Add `.env` file with your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Note:** Deployment for commercial purposes requires a separate license. Contact for commercial licensing.

## Part of the -Oid Family

Magic-Oid is part of the "-Oid" ecosystem of AI-powered identification tools:

- 📻 **Radi-Oid** - CB & ham radio identification
- 🎸 **Guit-Oid** - Vintage guitar authentication
- 🏠 **Miniature-Oid** - Dollhouse miniature identification
- 💿 **Vinyl-Oid** - Record pressing identification
- 🪙 **Coin-Oid** - Coin identification & grading
- 👗 **Designer-Oid** - Fashion authentication
- ⌚ **Watch-Oid** - Vintage watch identification

**Cross-App Pro Access**: One subscription works across ALL -Oid apps!

## How Magic-Oid Respects the Art

Magic-Oid follows the magic community's actual practices:

**Using Proper Terminology**
- References techniques by name (Tenkai palm, riffle force, Elmsley count, etc.)
- This is standard practice among magicians - it's how we communicate
- Laypeople won't understand the terminology anyway
- Helps magicians find the right learning resources

**"If you want to hide a method, write it in a book"**
- Famous magic saying - books are for magicians, not exposure
- Methods in published magic books are educational resources
- Discussing techniques among magicians is how the art progresses
- All Pro content references legitimate published works

**Educational, Not Exposure**
- Free mode: Uses terminology, discusses history, gives learning path
- Pro mode: Detailed breakdowns with book citations and purchase links
- Directs to legitimate sources (books, magic shops, dealers)
- Respects creators by recommending their published works
- Supports the magic economy (book sales, dealer sales)

**For Serious Learners**
- Pro features are for magicians developing their craft
- Honor system: By subscribing, you confirm you're learning to perform
- Not for exposing tricks to laypeople
- Build skills properly through study and practice

We believe magic literature should be accessible to those who want to learn the art properly. That's different from YouTube exposure videos that spoil tricks for clicks.

## Support Links

- **Buy Me a Coffee**: https://buymeacoffee.com/chrispteemagician
- **FeelFamous Kudos**: https://feelfamous.co.uk
- **Ko-fi**: https://ko-fi.com/zoom

## Cost Estimate

- **Vercel**: FREE (100GB bandwidth, unlimited function executions)
- **Claude API**: ~$0.01-0.03 per analysis (pay as you go)
- **Expected**: $5-15/month with moderate traffic
- **Shared key**: Use same ANTHROPIC_API_KEY across all apps

## Built By

**Chris P Tee**
- Magic Circle Magician
- UK Children's Entertainer of the Year 2018
- 30+ years performing experience
- Specializes in comedy magic, Punch & Judy, and corporate training

## Philosophy

"I got you" energy:
- **Clear structure** - No cognitive overwhelm
- **Honest assessment** - Real skill requirements, not gatekeeping
- **Actionable info** - What to do next
- **No waffle** - Get to the point
- **Encouraging** - Every magician started somewhere
- **Respect the art** - Learn properly, perform with pride

Built for neurodivergent-friendly experience: structured, predictable, helpful.

## License

Proprietary - All Rights Reserved

See [LICENSE.txt](LICENSE.txt) for full terms.

For commercial licensing inquiries, contact via chrisptee.com

## Version

1.0.0 - Initial release with FREE forever basic analysis and PRO method reveals
