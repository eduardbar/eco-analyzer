/**
 * Proveedor de análisis de IA usando Google Gemini.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIAnalysisResponse } from '../../types';
import type { IAIProvider } from './ai-provider.interface';

const ANALYSIS_PROMPT = `Eres un experto en análisis del ciclo de vida de productos de consumo. 
Analiza la siguiente descripción y responde ÚNICAMENTE con un objeto JSON válido.
No incluyas texto antes o después del JSON. No uses markdown.

Descripción del producto: "{DESCRIPTION}"

Proporciona estimaciones razonables basadas en la categoría del producto.

Estructura JSON requerida:
{
  "productTitle": "Nombre corto y descriptivo",
  "estimatedCarbonFootprintKg": <número positivo>,
  "estimatedWaterUsageLiters": <número positivo>,
  "materialsAnalysis": [
    {
      "materialName": "nombre del material",
      "sustainabilityScore": <número del 0 al 10>,
      "notes": "Justificación breve del score"
    }
  ],
  "endOfLife": {
    "recyclable": <true/false>,
    "notes": "Notas sobre reciclabilidad"
  },
  "overallSummary": "Resumen de 2-3 frases sobre el impacto ambiental general"
}`;

export class GeminiAIProvider implements IAIProvider {
  readonly providerName = 'GoogleGemini';
  
  private readonly genAI: GoogleGenerativeAI;
  private readonly modelName = 'gemini-1.5-flash-latest';

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyze(description: string): Promise<AIAnalysisResponse> {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    const prompt = ANALYSIS_PROMPT.replace('{DESCRIPTION}', description);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseResponse(text);
  }

  private parseResponse(text: string): AIAnalysisResponse {
    const jsonString = this.extractJSON(text);
    return JSON.parse(jsonString) as AIAnalysisResponse;
  }

  private extractJSON(text: string): string {
    // Intentar extraer de bloque de código markdown
    const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (markdownMatch?.[1]) {
      return markdownMatch[1].trim();
    }

    // Extraer JSON directamente
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return text.substring(firstBrace, lastBrace + 1);
    }

    throw new Error('No se pudo extraer JSON válido de la respuesta de Gemini');
  }
}
