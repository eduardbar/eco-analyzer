interface AIResponseForEcoScore {
  estimatedCarbonFootprintKg: number;
  estimatedWaterUsageLiters: number;
  materialsAnalysis: {
    sustainabilityScore: number;
  }[];
}

export const calculateEcoScore = (aiResponse: AIResponseForEcoScore): number => {
  const MAX_CARBON = 500; // Valor máximo de huella de carbono para normalización
  const MAX_WATER = 2000; // Valor máximo de uso de agua para normalización

  // Normalización de Huella de Carbono (0-100)
  const carbonScore = 100 - (Math.min(aiResponse.estimatedCarbonFootprintKg, MAX_CARBON) / MAX_CARBON) * 100;

  // Normalización de Uso de Agua (0-100)
  const waterScore = 100 - (Math.min(aiResponse.estimatedWaterUsageLiters, MAX_WATER) / MAX_WATER) * 100;

  // Puntuación de Materiales (0-100)
  const totalMaterialScore = aiResponse.materialsAnalysis.reduce((sum, material) => sum + material.sustainabilityScore, 0);
  const materialsScore = (totalMaterialScore / aiResponse.materialsAnalysis.length) * 10; // Promedio y escala a 0-100

  // Ponderación
  const WEIGHT_CARBON = 0.4;
  const WEIGHT_WATER = 0.3;
  const WEIGHT_MATERIALS = 0.3;

  const ecoScore = (
    (carbonScore * WEIGHT_CARBON) +
    (waterScore * WEIGHT_WATER) +
    (materialsScore * WEIGHT_MATERIALS)
  );

  // Asegurarse de que la puntuación esté entre 0 y 10
  return Math.max(0, Math.min(10, ecoScore / 10));
};
