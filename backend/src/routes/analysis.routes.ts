/**
 * Rutas de análisis de productos.
 * Nota: El authMiddleware se aplica en index.ts a nivel de grupo.
 */

import { Router } from 'express';
import { handleAnalyzeProduct, getAnalysisHistory } from '../controllers/analysis.controller';

const router = Router();

// POST /api/v1/analysis/analyze - Analizar un producto
router.post('/analyze', handleAnalyzeProduct);

// GET /api/v1/analysis - Obtener historial de análisis
router.get('/', getAnalysisHistory);

export default router;
