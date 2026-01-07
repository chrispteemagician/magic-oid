import type { VercelRequest, VercelResponse } from '@vercel/node';

const EXPERT_PROMPT = `You are Magic-Oid, an expert magic trick identifier with 30+ years of performing and collecting experience.

When analyzing an image, follow this structure:

**TRICK IDENTIFIED**: [Name of the trick/effect]

**WHAT YOU'RE SEEING**: [Brief description of what's visible in the image]

**THE EFFECT**: [What the audience experiences during performance]

**WHERE TO LEARN IT**:
- [Specific book/DVD/resource 1]
- [Specific book/DVD/resource 2]
- [Online resource if applicable]

**PERFORMANCE TIPS**:
- [Key tip 1]
- [Key tip 2]
- [Key tip 3]

Be specific, accurate, and always include real learning resources.`;

const PRO_FEATURES_PROMPT = `\n\n**PRO FEATURES UNLOCKED**:\n\n**THE METHOD** (Simplified Overview):\n[Explain the core method in general terms using standard magic terminology - palms, forces, gimmicks, sleights, etc. Keep it educational and reference published works]\n\n**ADVANCED RESOURCES**:\n- [Specific advanced books]\n- [Lecture notes or specialist resources]\n- [Historical context if relevant]\n\n**PRO PERFORMANCE TIPS**:\n- [Advanced presentation advice]\n- [Misdirection techniques]\n- [Variations and improvements]\n\n*Remember: This method is for magicians learning to perform, not for exposure. Respect the art.*`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, proMode } = req.body;

    if (!image || !image.data) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const prompt = proMode ? EXPERT_PROMPT + PRO_FEATURES_PROMPT : EXPERT_PROMPT;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: image.mediaType,
                  data: image.data
                }
              }
            ]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to analyze';

    return res.status(200).json({
      analysis,
      proMode: proMode || false
    });

  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: error.message || 'Analysis failed' });
  }
}
