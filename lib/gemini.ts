import { GoogleGenerativeAI } from '@google/generative-ai';

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    'GEMINI_API_KEY is not set. Please add it to your .env.local file.\n' +
    'Get your API key from: https://makersuite.google.com/app/apikey'
  );
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(apiKey);

// Use Gemini 2.5 Flash - Latest fast model (2025) - Best price/performance
export const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

export default genAI;
