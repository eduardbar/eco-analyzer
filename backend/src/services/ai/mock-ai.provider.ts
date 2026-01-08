/**
 * Proveedor Mock de análisis de IA.
 * Útil para desarrollo, testing y fallback cuando la API real no está disponible.
 */

import type { AIAnalysisResponse } from '../../types';
import type { IAIProvider } from './ai-provider.interface';

export class MockAIProvider implements IAIProvider {
  readonly providerName = 'MockProvider';

  async analyze(description: string): Promise<AIAnalysisResponse> {
    // Simular latencia de red
    await this.simulateDelay(100);

    const productTitle = this.extractProductTitle(description);

    return {
      productTitle,
      estimatedCarbonFootprintKg: this.generateRandomMetric(5, 50),
      estimatedWaterUsageLiters: this.generateRandomMetric(100, 1000),
      materialsAnalysis: [
        {
          materialName: 'Material Principal',
          sustainabilityScore: this.generateRandomMetric(4, 8),
          notes: 'Análisis estimado. Configure GEMINI_API_KEY para análisis real.',
        },
        {
          materialName: 'Material Secundario',
          sustainabilityScore: this.generateRandomMetric(3, 7),
          notes: 'Material con impacto ambiental moderado.',
        },
      ],
      endOfLife: {
        recyclable: Math.random() > 0.3,
        notes: 'Evaluación estimada de reciclabilidad.',
      },
      overallSummary: `Este es un análisis estimado para "${productTitle}". ` +
        'El producto presenta un impacto ambiental moderado basado en su descripción. ' +
        'Para un análisis detallado con IA, configure la API key de Gemini.',
    };
  }

  private extractProductTitle(description: string): string {
    const words = description.trim().split(/\s+/).slice(0, 5);
    return words.join(' ') + (description.split(/\s+/).length > 5 ? '...' : '');
  }

  private generateRandomMetric(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
