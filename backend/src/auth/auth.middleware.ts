/**
 * Middleware de autenticación JWT.
 */

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import type { JWTPayload } from '../types';

// ============================================================================
// TIPOS
// ============================================================================

export interface AuthenticatedRequest extends Request {
  user: { id: number };
}

// ============================================================================
// MIDDLEWARE
// ============================================================================

/**
 * Verifica el token JWT y añade el usuario al request.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token malformado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as unknown as JWTPayload;
    (req as AuthenticatedRequest).user = { id: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expirado' });
      return;
    }
    res.status(401).json({ error: 'Token inválido' });
  }
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Extrae el usuario autenticado del request.
 * Lanza error si no está autenticado (usar después de authMiddleware).
 */
export function getAuthenticatedUser(req: Request): { id: number } {
  const user = (req as AuthenticatedRequest).user;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }
  return user;
}
