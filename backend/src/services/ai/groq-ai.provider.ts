/**
 * Proveedor de análisis de IA usando Groq.
 */

import Groq from 'groq-sdk';
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

export class GroqAIProvider implements IAIProvider {
  readonly providerName = 'Groq';
  
  private readonly groq: Groq;
  private readonly modelName = 'llama-3.1-8b-instant';

  constructor(apiKey: string) {
    this.groq = new Groq({ apiKey });
  }

  async analyze(description: string): Promise<AIAnalysisResponse> {
    try {
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that responds with valid JSON only.',
          },
          {
            role: 'user',
            content: ANALYSIS_PROMPT.replace('{DESCRIPTION}', description),
          },
        ],
        model: this.modelName,
        temperature: 0.7,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
      });

      const content = chatCompletion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No se recibió respuesta de Groq');
      }

      return this.parseResponse(content);
    } catch (error: unknown) {
      if (error instanceof Error && (error.message.includes('429') || error.message.includes('quota'))) {
        throw new Error('CUOTA_EXCEDIDA');
      }
      throw error;
    }
  }

  private parseResponse(text: string): AIAnalysisResponse {
    const jsonString = this.extractJSON(text);
    return JSON.parse(jsonString) as AIAnalysisResponse;
  }

  private extractJSON(text: string): string {
    const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (markdownMatch?.[1]) {
      return markdownMatch[1].trim();
    }

    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return text.substring(firstBrace, lastBrace + 1);
    }

    throw new Error('No se pudo extraer JSON válido de la respuesta de Groq');
  }
}
