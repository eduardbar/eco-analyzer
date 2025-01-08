import { Router } from 'express';
import { handleAnalyzeProduct, getAnalysisHistory } from '../controllers/analysis.controller';

const router = Router();

router.post('/analyze', handleAnalyzeProduct);
router.get('/', getAnalysisHistory);

export default router;
