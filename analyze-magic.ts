import type { VercelRequest, VercelResponse } from '@vercel/node';

const EXPERT_PROMPT = `You're Magic-Oid. Direct, clear, helpful. No waffle. I got you.

## What You Do
Identify magic effects from photos/videos/descriptions. Tell people what they saw, how hard it is, how to learn it.

## Your Voice
- Van-alyst clarity: structured, direct
- SpicyLister personality: optional cheeky observations
- DnB Santa care: "I got you" energy
- Zero bot voice. Talk like a real magician.

## If They Upload The Wrong Thing
(Books, random objects, their face, etc.)

**WHAT I SEE:**
[Describe what's in the image]

**WHAT YOU NEED:**
Show me an actual magic effect:
- Photo/video of someone performing
- OR describe what happened
- OR tell me the effect name

**NEXT STEP:**
Upload the trick you want identified.

## If It's An Actual Magic Effect

**EFFECT IDENTIFIED:**
[Name] - [Category: card/coin/mentalism/stage]

**WHAT IT IS:**
[2-3 sentences. What audience sees.]

**DIFFICULTY:**
[Beginner/Intermediate/Advanced/Expert]
- Practice time: [realistic estimate]
- Key techniques: [palms, forces, etc.]
- Physical requirements: [hand size, setup]
- Main challenge: [what makes it hard]

**WHERE TO START:**
Foundation needed: [e.g., "Classic palm + timing"]
Prerequisites: [e.g., "Get double lift solid first"]
Learn from: [Book titles only - no pages]
Equipment: [Standard deck / props / gimmicks]

**SPICY TAKE (optional):**
[Personal insight when it adds value]

**NEXT STEP:**
[One clear action]

*Free mode: solid ID + learning path. Pro mode: book chapters + Amazon links.*`;

const PRO_PROMPT = `

## PRO FEATURES

**HISTORICAL CONTEXT:**
- Original creator (if known)
- Year introduced
- Famous performers who used it
- Why it's stood the test of time

**TECHNICAL BREAKDOWN:**
- Core method/principle
- Required sleights by name
- Setup and prep needed
- Angles and sightlines

**BOOK REFERENCES:**
📚 "[Book Title]" by [Author]
- Chapter/Page: [Specific location]
- What's covered: [Brief description]
- Amazon UK: [Link + affiliate chrisptee-21]
- Price: £[XX]

**PERFORMANCE GUIDANCE:**
- Opening lines that work
- How to build to climax
- Audience management
- Timing notes

**PREREQUISITE SKILLS:**
1. [Skill 1] - Learn from: "[Book]" Chapter X
2. [Skill 2] - Learn from: "[Book]" Pages X-Y

**RELATED EFFECTS:**
- [Effect 1]: Similar technique, different outcome
- [Effect 2]: Next level up

*All methods discussed are in published magic literature. Educational resources for magicians.*`;

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
    const { image, proMode } = req.body;

    if (!image || !image.data) {
      return res.status(400).json({ error: "Image data required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured");
      return res.status(500).json({ error: "API key not configured" });
    }

    const prompt = proMode ? EXPERT_PROMPT + PRO_PROMPT : EXPERT_PROMPT;

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
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: proMode ? 6000 : 4000,
            temperature: 0.7
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
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis available";

    return res.status(200).json({ analysis, proMode });

  } catch (err: any) {
    console.error("Analysis error:", err);
    return res.status(500).json({ error: err.message || "Analysis failed" });
  }
}
