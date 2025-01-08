import { AIClient } from './ai.client';
import { prisma } from '../lib/prisma';
import { calculateEcoScore } from '../utils/eco-score.calculator';
import { AIResponseSchema, AnalysisInputSchema } from '../utils/validation.schemas';

class AnalysisService {
  public async analyzeProduct(description: string, userId: number) {
    // 1. Validar entrada
    const inputValidation = AnalysisInputSchema.safeParse({ description });
    if (!inputValidation.success) {
      throw new Error(`Invalid input: ${inputValidation.error.issues.map(issue => issue.message).join(', ')}`);
    }

    // 2. Obtener análisis de la IA
    const aiResponse = await AIClient.getAnalysis(description);

    // 3. Validar respuesta de IA con Zod
    const validation = AIResponseSchema.safeParse(aiResponse);
    if (!validation.success) {
      console.error('AI Response validation failed:', validation.error);
      throw new Error('Invalid AI response format. Please try again.');
    }

    const validatedResponse = validation.data;

    // 4. Calcular el Eco-Score
    const ecoScore = calculateEcoScore(validatedResponse);

    // 5. Guardar en la base de datos usando Prisma
    const savedAnalysis = await prisma.analysis.create({
      data: {
        productTitle: validatedResponse.productTitle,
        ecoScore: ecoScore,
        summary: validatedResponse.overallSummary,
        carbonFootprint: validatedResponse.estimatedCarbonFootprintKg,
        waterUsage: validatedResponse.estimatedWaterUsageLiters,
        userId: userId,
        materials: {
          create: validatedResponse.materialsAnalysis.map(mat => ({
            materialName: mat.materialName,
            sustainabilityScore: mat.sustainabilityScore,
            notes: mat.notes,
          })),
        },
      },
      include: {
        materials: true, // Devolver los materiales creados en la respuesta
      },
    });

    return savedAnalysis;
  }
}

export const analysisService = new AnalysisService();
