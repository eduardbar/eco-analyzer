
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API KEY found");
    return;
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  // Note: The Node.js SDK doesn't always expose listModels directly on the main client in older versions, 
  // but let's try to infer/use the model directly or check docs.
  // Actually, checking the models via a simple generation test on a known stable model is better if listModels isn't easy.
  // But let's try to access the model manager if possible.
  
  console.log("Trying to find a working model...");
  
  const candidates = [
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-pro-001",
    "gemini-1.5-pro-002",
    "gemini-2.0-flash-exp"
  ];

  for (const modelName of candidates) {
    process.stdout.write(`Testing ${modelName}... `);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log("SUCCESS ✅");
      break; 
    } catch (e: any) {
        if (e.message && e.message.includes("404")) {
             console.log("Not Found ❌");
        } else {
            console.log(`Error: ${e.message}`);
        }
    }
  }
}

listModels();
