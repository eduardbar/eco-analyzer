
import { analysisService } from '../services/analysis.service';
import { prisma } from '../lib/prisma';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config();

async function main() {
  console.log("Starting debug script...");
  
  try {
    // 1. Create a dummy user for the test
    const user = await prisma.user.upsert({
      where: { email: 'debug@example.com' },
      update: {},
      create: {
        email: 'debug@example.com',
        password: 'hashed_password_placeholder',
        name: 'Debug User'
      }
    });
    console.log("User found/created:", user.id);

    // 2. Call the service
    console.log("Calling analysisService.analyzeProduct...");
    const description = "A plastic water bottle made of PET.";
    const result = await analysisService.analyzeProduct(description, user.id);
    
    console.log("Analysis Success!", JSON.stringify(result, null, 2));

  } catch (error) {
    console.error("Analysis Failed!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
