import type { VercelRequest, VercelResponse } from '@vercel/node';

// [Copy the EXPERT_PROMPT and PRO_FEATURES_PROMPT from your Netlify function]

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
    
    // [Rest of your Gemini API logic here - same as Netlify function]
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Analysis failed' });
  }
}
