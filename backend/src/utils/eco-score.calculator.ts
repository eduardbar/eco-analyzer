/**
 * Calculadora de Eco-Score.
 * 
 * Convierte métricas de impacto ambiental en un score normalizado de 0-10.
 * Mayor score = Mejor para el medio ambiente.
 */

import { ecoScoreConfig } from '../config';
import type { EcoScoreInput } from '../types';

/**
 * Normaliza un valor a un porcentaje invertido (menor valor = mejor score).
 */
function normalizeInverse(value: number, maxValue: number): number {
  const clampedValue = Math.min(value, maxValue);
  return 100 - (clampedValue / maxValue) * 100;
}

/**
 * Calcula el score promedio de materiales.
 */
function calculateMaterialsAverageScore(
  materials: Pick<{ sustainabilityScore: number }, 'sustainabilityScore'>[]
): number {
  if (materials.length === 0) return 0;

  const totalScore = materials.reduce(
    (sum, material) => sum + material.sustainabilityScore,
    0
  );

  // Convertir de escala 0-10 a 0-100
  return (totalScore / materials.length) * 10;
}

/**
 * Calcula el Eco-Score basado en huella de carbono, uso de agua y materiales.
 * 
 * @param input - Datos de análisis de la IA
 * @returns Score de 0-10 (mayor = mejor)
 */
export function calculateEcoScore(input: EcoScoreInput): number {
  const { maxCarbonFootprint, maxWaterUsage, weights } = ecoScoreConfig;

  const carbonScore = normalizeInverse(
    input.estimatedCarbonFootprintKg,
    maxCarbonFootprint
  );

  const waterScore = normalizeInverse(
    input.estimatedWaterUsageLiters,
    maxWaterUsage
  );

  const materialsScore = calculateMaterialsAverageScore(input.materialsAnalysis);

  const weightedScore =
    carbonScore * weights.carbon +
    waterScore * weights.water +
    materialsScore * weights.materials;

  // Normalizar a escala 0-10 y asegurar límites
  const finalScore = weightedScore / 10;
  return Math.max(0, Math.min(10, Number(finalScore.toFixed(2))));
}
