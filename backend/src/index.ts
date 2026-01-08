/**
 * Punto de entrada de la aplicación.
 * Configura Express, middleware y rutas.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { config } from './config';
import { setupMiddleware } from './middleware';
import analysisRoutes from './routes/analysis.routes';
import authRoutes from './auth/auth.routes';
import { authMiddleware } from './auth/auth.middleware';

// ============================================================================
// CONFIGURACIÓN DE APP
// ============================================================================

const app = express();

// CORS
app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (ej: Postman, curl)
    if (!origin) return callback(null, true);
    
    // Permitir localhost para desarrollo
    if (origin.startsWith('http://localhost')) return callback(null, true);
    
    // Permitir subdominios de vercel.app
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    
    // Permitir dominio personalizado
    if (origin === 'https://eco-analyzer.bmtechlab.online') return callback(null, true);
    
    callback(new Error('No permitido por CORS'));
  },
  credentials: true,
}));

// Middleware común
setupMiddleware(app);

// ============================================================================
// RUTAS
// ============================================================================

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'EcoAnalyzer API funcionando',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    geminiConfigured: !!config.geminiApiKey,
    geminiKeyPrefix: config.geminiApiKey ? config.geminiApiKey.substring(0, 10) + '...' : null,
  });
});

// Rutas públicas
app.use('/api/v1/auth', authRoutes);

// Rutas protegidas
app.use('/api/v1/analysis', authMiddleware, analysisRoutes);

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================

app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║                EcoAnalyzer API                     ║
╠════════════════════════════════════════════════════╣
║  Puerto: ${config.port.toString().padEnd(41)}║
║  Ambiente: ${config.nodeEnv.padEnd(39)}║
║  IA: ${config.geminiApiKey ? 'Gemini configurado ✓' : 'Mock (sin API key)'.padEnd(40)}    ║
╚════════════════════════════════════════════════════╝
  `);
});
