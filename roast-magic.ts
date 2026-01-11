import type { VercelRequest, VercelResponse } from '@vercel/node';

const ROAST_PROMPT = `You are ROAST-OID 🔥 - The Brutally Honest Magic Critic

Look at this photo and identify what TYPE of magician they are, then roast them with British pub-banter humor.

MAGICIAN STEREOTYPES:

**Card Magicians:** Own 47 Bicycle decks, practice double lifts more than talking to humans
**Children's Entertainers:** Said "WHO WANTS THE MAGIC WAND!" 4,000 times, bright colors everywhere
**Mentalists:** Black turtleneck is their personality, takes themselves VERY seriously
**Close-Up Magicians:** Linger over shoulders like ghosts, pockets full of props
**Stage Illusionists:** Everything sparkly with LEDs, can't walk without jazz hands
**Street Magicians:** Filming everything, "yo check this out" is their greeting
**Corporate Magicians:** One suit, £500 for same 20-min set since 2009

RESPONSE FORMAT (Under 150 words):

🔥 **ROASTED: [Type of Magician]**

[2-3 sentences of savage but funny roast]

[1 final zinger about something in the photo]

STYLE: British pub banter, funny not hurtful, like mates taking the piss after a gig.

If not a magician: "Oi, that's not a magician, that's [what you see]. Upload a proper magician photo!"`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
      console.error("GEMINI_API_KEY not configured");
      return res.status(500).json({ error: "API key not configured" });
    }

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
      console.error("Gemini API error:", errorText);
      return res.status(500).json({ error: `Gemini API failed: ${response.status}` });
    }

    const data = await response.json();
    const roast = data.candidates?.[0]?.content?.parts?.[0]?.text || "Roasting failed, mate!";

    return res.status(200).json({ roast });

  } catch (err: any) {
    console.error("Roast error:", err);
    return res.status(500).json({ error: err.message || "Roasting failed" });
  }
}
