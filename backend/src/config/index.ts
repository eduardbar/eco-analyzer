/**
 * Configuración centralizada de la aplicación.
 * Extrae variables de entorno y provee valores por defecto seguros.
 */

// ============================================================================
// HELPERS
// ============================================================================

function getRequiredEnv(key: string, defaultForDev: string): string {
  const value = process.env[key];
  if (value) {
    return value;
  }
  // En desarrollo, permitir valor por defecto
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`⚠ ${key} no configurada, usando valor por defecto (solo desarrollo)`);
    return defaultForDev;
  }
  throw new Error(`Variable de entorno requerida no configurada: ${key}`);
}

function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

// ============================================================================
// CONFIGURACIÓN - Valores inicializados inmediatamente
// ============================================================================

// Constantes de configuración (garantizadas como string en tiempo de compilación)
const JWT_SECRET: string = getRequiredEnv('JWT_SECRET', 'dev_jwt_secret_change_in_production');
const NODE_ENV: string = getOptionalEnv('NODE_ENV', 'development');
const PORT: number = parseInt(getOptionalEnv('PORT', '3001'), 10);
const GROQ_API_KEY: string | null = process.env.GROQ_API_KEY ?? null;

export const config = {
  port: PORT,
  jwtSecret: JWT_SECRET,
  groqApiKey: GROQ_API_KEY,
  nodeEnv: NODE_ENV,
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
} as const;

// Tipo derivado de la configuración
export type AppConfig = typeof config;

// ============================================================================
// CORS CONFIG
// ============================================================================

export const corsConfig = {
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    /\.vercel\.app$/,
    'https://eco-analyzer-backend.onrender.com',
  ] as (string | RegExp)[],
  credentials: true,
} as const;

// ============================================================================
// ECO-SCORE CONFIG
// ============================================================================

/**
 * Configuración del cálculo de Eco-Score.
 * Basado en métricas de ciclo de vida de productos de consumo promedio.
 * 
 * MAX_CARBON: 500kg CO2e - Huella de carbono alta para productos complejos
 * MAX_WATER: 2000L - Uso de agua alto considerando ciclo completo
 * Pesos: Carbono (40%), Agua (30%), Materiales (30%) - Prioriza impacto climático
 */
export const ecoScoreConfig = {
  maxCarbonFootprint: 500,
  maxWaterUsage: 2000,
  weights: {
    carbon: 0.4,
    water: 0.3,
    materials: 0.3,
  },
} as const;

export type EcoScoreConfig = typeof ecoScoreConfig;
