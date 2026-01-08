/**
 * Configuración de middleware de Express.
 */

import type { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import { config } from '../config';

/**
 * Configura middleware común de la aplicación.
 */
export function setupMiddleware(app: Express): void {
  // Parser JSON con límite de tamaño
  app.use(express.json({ limit: '10mb' }));

  // Logger de requests (solo en desarrollo)
  if (config.isDevelopment) {
    app.use(requestLogger);
  }

  // Manejador de errores de JSON malformado
  app.use(jsonErrorHandler);
}

/**
 * Logger de requests para desarrollo.
 */
function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
}

/**
 * Manejador de errores de parsing JSON.
 */
function jsonErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ error: 'Formato JSON inválido' });
    return;
  }
  next(error);
}
