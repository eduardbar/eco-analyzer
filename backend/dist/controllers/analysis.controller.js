"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalysisHistory = exports.handleAnalyzeProduct = void 0;
const prisma_1 = require("../lib/prisma");
const analysis_service_1 = require("../services/analysis.service");
const handleAnalyzeProduct = async (req, res) => {
    const { description } = req.body;
    const userId = req.user?.id;
    if (!description) {
        return res.status(400).json({ error: 'La descripción es obligatoria.' });
    }
    if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado.' });
    }
    try {
        const newAnalysis = await analysis_service_1.analysisService.analyzeProduct(description, userId);
        res.status(201).json(newAnalysis);
    }
    catch (error) {
        console.error("Error al analizar el producto:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.handleAnalyzeProduct = handleAnalyzeProduct;
const getAnalysisHistory = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado.' });
    }
    try {
        const analyses = await prisma_1.prisma.analysis.findMany({
            where: { userId: userId },
            include: { materials: true },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(analyses);
    }
    catch (error) {
        console.error("Error al obtener el historial de análisis:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.getAnalysisHistory = getAnalysisHistory;
//# sourceMappingURL=analysis.controller.js.map