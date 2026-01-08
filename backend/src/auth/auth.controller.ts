/**
 * Controlador de autenticación.
 * Maneja registro y login de usuarios.
 */

import type { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { config } from '../config';
import { 
  UserRegistrationSchema, 
  UserLoginSchema, 
  validateSchema 
} from '../utils/validation.schemas';
import type { AuthTokenResponse, ApiErrorResponse } from '../types';

// ============================================================================
// CONSTANTES
// ============================================================================

const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION = '24h';

// ============================================================================
// HANDLERS
// ============================================================================

/**
 * POST /auth/register
 * Registra un nuevo usuario.
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const validation = validateSchema(UserRegistrationSchema, req.body);

    if (!validation.success) {
      res.status(400).json({
        error: 'Datos de registro inválidos',
        details: validation.errors,
      } as ApiErrorResponse);
      return;
    }

    const { email, password, name } = validation.data!;

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'El email ya está registrado' } as ApiErrorResponse);
      return;
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' } as ApiErrorResponse);
  }
}

/**
 * POST /auth/login
 * Autentica un usuario y retorna un token JWT.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const validation = validateSchema(UserLoginSchema, req.body);

    if (!validation.success) {
      res.status(400).json({
        error: 'Datos de login inválidos',
        details: validation.errors,
      } as ApiErrorResponse);
      return;
    }

    const { email, password } = validation.data!;

    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' } as ApiErrorResponse);
      return;
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Credenciales inválidas' } as ApiErrorResponse);
      return;
    }

    // Generar token
    const token = jwt.sign(
      { userId: user.id },
      config.jwtSecret,
      { expiresIn: TOKEN_EXPIRATION }
    );

    const response: AuthTokenResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' } as ApiErrorResponse);
  }
}
