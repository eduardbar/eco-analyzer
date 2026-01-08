/**
 * Controlador de análisis de productos.
 * Delega la lógica de negocio al servicio de análisis.
 */

import type { Request, Response } from 'express';
import { getAuthenticatedUser } from '../auth/auth.middleware';
import { 
  analysisService, 
  ValidationError, 
  AIAnalysisError 
} from '../services/analysis.service';
import type { ApiErrorResponse } from '../types';

// ============================================================================
// HANDLERS
// ============================================================================

/**
 * POST /analysis/analyze
 * Analiza un producto basado en su descripción.
 */
export async function handleAnalyzeProduct(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body;
    const user = getAuthenticatedUser(req);

    if (!description || typeof description !== 'string') {
      res.status(400).json({ 
        error: 'La descripción del producto es obligatoria' 
      } as ApiErrorResponse);
      return;
    }

    const analysis = await analysisService.analyzeProduct(description.trim(), user.id);
    res.status(201).json(analysis);

  } catch (error) {
    handleAnalysisError(error, res);
  }
}

/**
 * GET /analysis
 * Obtiene el historial de análisis del usuario.
 */
export async function getAnalysisHistory(req: Request, res: Response): Promise<void> {
  try {
    const user = getAuthenticatedUser(req);
    const history = await analysisService.getAnalysisHistory(user.id);
    res.json(history);

  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ 
      error: 'Error al obtener el historial de análisis' 
    } as ApiErrorResponse);
  }
}

// ============================================================================
// MANEJO DE ERRORES
// ============================================================================

function handleAnalysisError(error: unknown, res: Response): void {
  if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Error de validación',
      details: error.errors,
    } as ApiErrorResponse);
    return;
  }

  if (error instanceof AIAnalysisError) {
    // Verificar si es error de cuota
    if (error.message.includes('CUOTA_EXCEDIDA')) {
      res.status(429).json({
        error: 'Cuota excedida',
        details: ['La cuota de la API de IA ha sido excedida. Intenta más tarde.'],
      } as ApiErrorResponse);
      return;
    }

    console.error('Error de análisis de IA:', error.message);
    res.status(502).json({
      error: 'Error al procesar el análisis con IA',
      details: [error.message],
    } as ApiErrorResponse);
    return;
  }

  console.error('Error inesperado en análisis:', error);
  res.status(500).json({ 
    error: 'Error interno del servidor' 
  } as ApiErrorResponse);
}
