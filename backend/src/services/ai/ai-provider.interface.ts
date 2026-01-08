/**
 * Interfaz para proveedores de análisis de IA.
 * Permite intercambiar implementaciones (Gemini, OpenAI, Mock) sin modificar el código consumidor.
 * 
 * Principio: Open/Closed - Abierto para extensión, cerrado para modificación.
 */

import type { AIAnalysisResponse } from '../../types';

export interface IAIProvider {
  /**
   * Analiza la descripción de un producto y retorna métricas ambientales.
   * @param description - Descripción del producto a analizar
   * @returns Análisis completo del producto
   */
  analyze(description: string): Promise<AIAnalysisResponse>;
  
  /**
   * Nombre del proveedor para logging/debugging.
   */
  readonly providerName: string;
}
