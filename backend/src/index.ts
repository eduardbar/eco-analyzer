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
import { prisma } from './lib/prisma';

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

// Health check detallado
app.get('/api/v1/health', async (_req, res) => {
  const startTime = process.uptime();

  const health = {
    status: 'OK',
    message: 'EcoAnalyzer API funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: config.nodeEnv,
    uptime: `${Math.floor(startTime)}s`,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
    },
    components: {
      database: { status: 'UNKNOWN', message: 'No verificado' },
      aiProvider: { status: 'UNKNOWN', message: 'No verificado' },
    },
  };

  try {
    // Verificar conexión a base de datos
    try {
      await prisma.$queryRaw`SELECT 1`;
      health.components.database = { status: 'HEALTHY', message: 'Conexión exitosa' };
    } catch (dbError) {
      health.components.database = { status: 'UNHEALTHY', message: 'Error de conexión' };
      health.status = 'DEGRADED';
    }

    // Verificar AI Provider (solo si está configurado)
    if (config.groqApiKey) {
      try {
        const { getAIProvider } = await import('./services/ai/index.js');
        const provider = getAIProvider();
        const testResult = await provider.analyze('test');
        if (testResult && testResult.productTitle) {
          health.components.aiProvider = {
            status: 'HEALTHY',
            message: `Proveedor: ${provider.providerName}`,
          };
        }
      } catch (aiError) {
        health.components.aiProvider = {
          status: 'UNHEALTHY',
          message: aiError instanceof Error ? aiError.message : 'Error desconocido',
        };
        health.status = 'DEGRADED';
      }
    } else {
      health.components.aiProvider = { status: 'DISABLED', message: 'AI Provider no configurado' };
    }

    const statusCode = health.status === 'OK' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Error crítico en health check',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Health check simple (para load balancers)
app.get('/api/v1/healthz', (_req, res) => {
  res.status(200).send('OK');
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
 ║  IA: ${config.groqApiKey ? 'Groq configurado ✓' : 'Mock (sin API key)'.padEnd(40)}    ║
╚════════════════════════════════════════════════════╝
  `);
});
