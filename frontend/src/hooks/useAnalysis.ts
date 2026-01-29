/**
 * Hook de análisis de productos.
 * Maneja solo la lógica de análisis, separada de la autenticación.
 */

'use client';

import { useState, useCallback } from 'react';
import { apiClient, AuthenticationError, ApiRequestError } from '@/services/api.client';
import type { AnalysisResult } from '@/types';

// ============================================================================
// TIPOS
// ============================================================================

interface UseAnalysisReturn {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  analyzeProduct: (description: string) => Promise<void>;
  getHistory: () => Promise<AnalysisResult[]>;
  clearResult: () => void;
  clearError: () => void;
}

// ============================================================================
// HOOK
// ============================================================================

export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeProduct = useCallback(async (description: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.post<AnalysisResult>(
        '/analysis/analyze',
        { description },
        true // requireAuth
      );
      setResult(data);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Error al analizar el producto';

      if (err instanceof ApiRequestError && err.details?.length) {
        message = err.details.join(' ');
      }

      setError(message);
      
      // Re-throw AuthenticationError para que el componente pueda manejarlo
      if (err instanceof AuthenticationError) {
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getHistory = useCallback(async (): Promise<AnalysisResult[]> => {
    setIsLoading(true);
    setError(null);

    try {
      return await apiClient.get<AnalysisResult[]>('/analysis', true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener historial';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResult = useCallback((): void => {
    setResult(null);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    result,
    isLoading,
    error,
    analyzeProduct,
    getHistory,
    clearResult,
    clearError,
  };
}

// Re-exportar el hook con el nombre original para compatibilidad
export { useAnalysis as useProductAnalysis };
