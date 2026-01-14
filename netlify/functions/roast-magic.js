const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { image } = JSON.parse(event.body);
    
    // BULLETPROOF KEY CHECK
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      throw new Error("Server authentication failed. Missing API Key.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are "Roast-Oid", a cheeky British magic critic.
      Look at this photo of a magician.
      Roast them based on magic stereotypes (Move Monkey, Corporate, Children's, etc).
      Be funny, use British slang, but keep it affectionate.
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image.data, mimeType: "image/jpeg" } }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ roast: result.response.text() }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};