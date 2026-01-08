/**
 * Servicio de análisis de productos.
 * Orquesta el flujo de análisis: validación → IA → cálculo → persistencia.
 */

import { prisma } from '../lib/prisma';
import { calculateEcoScore } from '../utils/eco-score.calculator';
import { AIResponseSchema, AnalysisInputSchema, validateSchema } from '../utils/validation.schemas';
import { getAIProvider } from './ai';
import type { AIAnalysisResponse } from '../types';

// ============================================================================
// TIPOS
// ============================================================================

export interface AnalysisResult {
  id: number;
  productTitle: string;
  ecoScore: number;
  summary: string;
  carbonFootprint: number;
  waterUsage: number;
  createdAt: Date;
  materials: {
    id: number;
    materialName: string;
    sustainabilityScore: number;
    notes: string;
  }[];
}

// ============================================================================
// ERRORES PERSONALIZADOS
// ============================================================================

export class ValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super(`Error de validación: ${errors.join(', ')}`);
    this.name = 'ValidationError';
  }
}

export class AIAnalysisError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'AIAnalysisError';
  }
}

// ============================================================================
// SERVICIO
// ============================================================================

/**
 * Analiza un producto y guarda el resultado en la base de datos.
 */
export async function analyzeProduct(
  description: string,
  userId: number
): Promise<AnalysisResult> {
  // 1. Validar entrada
  const inputValidation = validateSchema(AnalysisInputSchema, { description });
  if (!inputValidation.success) {
    throw new ValidationError(inputValidation.errors!);
  }

  // 2. Obtener análisis de IA
  const aiResponse = await getAIAnalysis(description);

  // 3. Validar respuesta de IA
  const responseValidation = validateSchema(AIResponseSchema, aiResponse);
  if (!responseValidation.success) {
    console.error('Respuesta de IA inválida:', JSON.stringify(aiResponse, null, 2));
    throw new AIAnalysisError(
      `Formato de respuesta de IA inválido: ${responseValidation.errors!.join(', ')}`
    );
  }

  const validatedResponse = responseValidation.data!;

  // 4. Calcular Eco-Score
  const ecoScore = calculateEcoScore(validatedResponse);

  // 5. Persistir en base de datos
  return saveAnalysis(validatedResponse, ecoScore, userId);
}

/**
 * Obtiene el historial de análisis de un usuario.
 */
export async function getAnalysisHistory(userId: number): Promise<AnalysisResult[]> {
  return prisma.analysis.findMany({
    where: { userId },
    include: { materials: true },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================================================
// FUNCIONES PRIVADAS
// ============================================================================

async function getAIAnalysis(description: string): Promise<AIAnalysisResponse> {
  const provider = getAIProvider();
  
  try {
    return await provider.analyze(description);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    throw new AIAnalysisError(
      `Error al obtener análisis de ${provider.providerName}: ${message}`,
      error instanceof Error ? error : undefined
    );
  }
}

async function saveAnalysis(
  response: AIAnalysisResponse,
  ecoScore: number,
  userId: number
): Promise<AnalysisResult> {
  return prisma.analysis.create({
    data: {
      productTitle: response.productTitle,
      ecoScore,
      summary: response.overallSummary,
      carbonFootprint: response.estimatedCarbonFootprintKg,
      waterUsage: response.estimatedWaterUsageLiters,
      userId,
      materials: {
        create: response.materialsAnalysis.map((mat) => ({
          materialName: mat.materialName,
          sustainabilityScore: mat.sustainabilityScore,
          notes: mat.notes,
        })),
      },
    },
    include: { materials: true },
  });
}

// Exportar objeto para compatibilidad con código existente
export const analysisService = {
  analyzeProduct,
  getAnalysisHistory,
};
