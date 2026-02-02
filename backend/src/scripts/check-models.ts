
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("No API KEY found");
    return;
  }

  const groq = new Groq({ apiKey });

  console.log("Trying to find a working model...");

  const candidates = [
    "llama-3.1-8b-instant",
    "llama-3.1-70b-versatile",
    "llama-3.3-70b-versatile"
  ];

  for (const modelName of candidates) {
    process.stdout.write(`Testing ${modelName}... `);
    try {
      const result = await groq.chat.completions.create({
        messages: [{ role: 'user', content: 'Hello' }],
        model: modelName,
        max_tokens: 10
      });
      console.log("SUCCESS ✅");
      break;
    } catch (e: any) {
      if (e.message && e.message.includes("404")) {
        console.log("Not Found ❌");
      } else if (e.message && e.message.includes("401")) {
        console.log("Unauthorized - Check API Key ❌");
        break;
      } else {
        console.log(`Error: ${e.message}`);
      }
    }
  }
}

listModels();
