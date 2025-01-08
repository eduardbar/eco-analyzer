import type { Response } from 'express';
import type { AuthenticatedRequest } from '../auth/auth.middleware';
import { prisma } from '../lib/prisma';
import { analysisService } from '../services/analysis.service';

export const handleAnalyzeProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { description } = req.body;
    const userId = req.user?.id;

    if (!description) {
        return res.status(400).json({ error: 'La descripción es obligatoria.' });
    }

    if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    try {
        const newAnalysis = await analysisService.analyzeProduct(description, userId);
        res.status(201).json(newAnalysis);
    } catch (error) {
        console.error("Error al analizar el producto:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export const getAnalysisHistory = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    try {
        const analyses = await prisma.analysis.findMany({
            where: { userId: userId },
            include: { materials: true },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(analyses);
    } catch (error) {
        console.error("Error al obtener el historial de análisis:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};