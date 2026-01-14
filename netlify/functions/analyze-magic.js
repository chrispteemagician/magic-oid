const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { image, mode } = JSON.parse(event.body);
    
    // BULLETPROOF KEY CHECK
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) throw new Error("Server authentication failed. Missing API Key.");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt;
    if (mode === 'roast') {
      prompt = `You are "Roast-Oid", a cheeky British magic critic. Roast this magician/photo based on stereotypes. Be funny, affectionate, and use British slang. Max 150 words.`;
    } else {
      prompt = `You are a Magic Historian. Identify this trick/prop/book. 1. IDENTITY: Name, Creator. 2. EFFECT: What happens? 3. VALUE: Collector estimate. 4. HISTORY: Fun fact. Do NOT reveal secrets.`;
    }

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image.data, mimeType: "image/jpeg" } }
    ]);

    return { statusCode: 200, body: JSON.stringify({ result: result.response.text() }) };

  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};