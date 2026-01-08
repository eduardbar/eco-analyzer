/**
 * Factory para crear el proveedor de IA apropiado.
 * Centraliza la lógica de selección y configuración.
 */

import { config } from '../../config';
import type { IAIProvider } from './ai-provider.interface';
import { GeminiAIProvider } from './gemini-ai.provider';
import { MockAIProvider } from './mock-ai.provider';

let cachedProvider: IAIProvider | null = null;

/**
 * Crea o retorna el proveedor de IA configurado.
 * Usa Gemini si hay API key válida, Mock en caso contrario.
 */
export function getAIProvider(): IAIProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  const apiKey = config.geminiApiKey;
  const isValidApiKey = apiKey && !apiKey.includes('your_') && apiKey.length > 10;

  if (isValidApiKey) {
    console.log('✓ Usando proveedor de IA: Google Gemini');
    cachedProvider = new GeminiAIProvider(apiKey);
  } else {
    console.warn('⚠ GEMINI_API_KEY no configurada. Usando proveedor Mock.');
    cachedProvider = new MockAIProvider();
  }

  return cachedProvider;
}

/**
 * Resetea el proveedor cacheado (útil para testing).
 */
export function resetAIProvider(): void {
  cachedProvider = null;
}

// Re-exportar interfaces y providers
export type { IAIProvider } from './ai-provider.interface';
export { GeminiAIProvider } from './gemini-ai.provider';
export { MockAIProvider } from './mock-ai.provider';
