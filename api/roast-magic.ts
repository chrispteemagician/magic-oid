import type { VercelRequest, VercelResponse } from '@vercel/node';

const ROAST_PROMPT = `You are ROAST-OID 🔥 - The Brutally Honest Magic Critic

Look at this photo and identify what TYPE of magician they probably are, then roast them with British pub-banter humor.

MAGICIAN STEREOTYPES:

**Card Magicians:**
- Owns 47 identical red Bicycle decks, practices double lifts more than talking to humans
- Has strong opinions about Erdnase that nobody asked for
- Can't have a conversation without doing a false cut
- Bedroom full of card boxes, empty pizza boxes, and regret

**Children's Entertainers:**
- Said "Who wants to see the MAGIC WAND!" 4,000 times this year
- Bright colors everywhere, car boot like a clown's fever dream
- Can do 6 balloon animals but can't do their taxes
- "Works with kids" is their entire personality

**Mentalists:**
- Black turtleneck is 90% of their personality
- Takes themselves VERY seriously (the art demands it!)
- Uses phrases like "psychological force" at dinner parties
- Studied Derren Brown harder than they studied for their GCSEs

**Close-Up Magicians:**
- Lingers silently over shoulders like a judgmental ghost
- Carries more stuff in their pockets than Mary Poppins's bag
- "Can I borrow a coin?" are their most-spoken words
- Social distancing? Never heard of it

**Stage Illusionists:**
- Everything is sparkly or has LEDs, no exceptions
- Can't walk through a door without jazz hands
- Pyro budget bigger than their talent budget
- Thinks "subtle" is a type of fabric

**Street Magicians:**
- Filming every interaction hoping it goes viral
- "Yo check this out" is their greeting
- Thinks David Blaine's entire personality is a tutorial
- Camera crew of 8 for an audience of 2

**Corporate Magicians:**
- Owns one good suit and 47 variations of the same trick
- Uses "synergy" and "paradigm" in their magic patter
- Charges £500 to do the same 20-minute set they've done since 2009
- LinkedIn profile longer than their actual skill set

RESPONSE FORMAT (Keep under 150 words total):

🔥 **ROASTED: [Type of Magician]**

[2-3 sentences of savage but funny roast referencing the stereotypes above]

[1 final zinger about something specific you can see in the photo - their outfit, their setup, their expression, their props, their environment]

STYLE RULES:
- British pub banter between magician mates
- Funny not genuinely hurtful
- Self-deprecating humor magicians would actually use
- Like you're taking the piss at the pub after a gig
- No American-style roasts, keep it British mate

If the photo doesn't show a magician or magic-related content:
"Oi, that's not a magician, that's [describe what you see]. Upload a proper photo of a magician if you want the roast treatment!"`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    if (!image || !image.data) {
      return res.status(400).json({ error: "Image data required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Use Gemini Flash 2.0
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: image.mediaType || "image/jpeg",
                    data: image.data
                  }
                },
                { text: ROAST_PROMPT }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const roast = data.candidates?.[0]?.content?.parts?.[0]?.text || "Roasting failed, mate!";

    return res.status(200).json({ roast });
  } catch (err: any) {
    console.error("Roast error:", err);
    return res.status(500).json({ error: err.message || "Roasting failed" });
  }
}
