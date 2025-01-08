"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisService = void 0;
const ai_client_1 = require("./ai.client");
const prisma_1 = require("../lib/prisma");
const eco_score_calculator_1 = require("../utils/eco-score.calculator");
const validation_schemas_1 = require("../utils/validation.schemas");
class AnalysisService {
    async analyzeProduct(description, userId) {
        // 1. Validar entrada
        const inputValidation = validation_schemas_1.AnalysisInputSchema.safeParse({ description });
        if (!inputValidation.success) {
            throw new Error(`Invalid input: ${inputValidation.error.issues.map(issue => issue.message).join(', ')}`);
        }
        // 2. Obtener análisis de la IA
        const aiResponse = await ai_client_1.AIClient.getAnalysis(description);
        // 3. Validar respuesta de IA con Zod
        const validation = validation_schemas_1.AIResponseSchema.safeParse(aiResponse);
        if (!validation.success) {
            console.error('AI Response validation failed:', validation.error);
            throw new Error('Invalid AI response format. Please try again.');
        }
        const validatedResponse = validation.data;
        // 4. Calcular el Eco-Score
        const ecoScore = (0, eco_score_calculator_1.calculateEcoScore)(validatedResponse);
        // 5. Guardar en la base de datos usando Prisma
        const savedAnalysis = await prisma_1.prisma.analysis.create({
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
exports.analysisService = new AnalysisService();
//# sourceMappingURL=analysis.service.js.map