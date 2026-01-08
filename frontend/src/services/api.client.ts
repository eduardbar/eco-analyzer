/**
 * Cliente HTTP para comunicación con la API.
 * Centraliza la lógica de fetch, manejo de errores y autenticación.
 */

import type { ApiError } from '@/types';

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

// Siempre usamos rutas relativas para aprovechar los rewrites de Vercel/Next.js
// que proxean /api/* hacia el backend en Render (evita problemas de CORS)
// En desarrollo local, next.config.mjs también tiene rewrites configurados
const API_BASE_URL = '/api/v1';

// ============================================================================
// ERRORES PERSONALIZADOS
// ============================================================================

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: string[]
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export class AuthenticationError extends ApiRequestError {
  constructor(message: string = 'Sesión expirada. Por favor, inicia sesión nuevamente.') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

// ============================================================================
// STORAGE DE TOKEN
// ============================================================================

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser<T>(): T | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};

// ============================================================================
// CLIENTE HTTP
// ============================================================================

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  requireAuth?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, requireAuth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Añadir token si se requiere autenticación
  if (requireAuth) {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new AuthenticationError('No estás autenticado. Por favor, inicia sesión.');
    }
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Manejar respuesta no-JSON
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    if (!response.ok) {
      throw new ApiRequestError(
        `Error del servidor (${response.status})`,
        response.status
      );
    }
    return {} as T;
  }

  const data = await response.json();

  // Manejar errores HTTP
  if (!response.ok) {
    // Manejar 401 específicamente
    if (response.status === 401) {
      tokenStorage.clear();
      throw new AuthenticationError((data as ApiError).error);
    }

    throw new ApiRequestError(
      (data as ApiError).error || 'Error desconocido',
      response.status,
      (data as ApiError).details
    );
  }

  return data as T;
}

// ============================================================================
// MÉTODOS PÚBLICOS
// ============================================================================

export const apiClient = {
  get<T>(endpoint: string, requireAuth = false): Promise<T> {
    return request<T>(endpoint, { method: 'GET', requireAuth });
  },

  post<T>(endpoint: string, body: unknown, requireAuth = false): Promise<T> {
    return request<T>(endpoint, { method: 'POST', body, requireAuth });
  },

  put<T>(endpoint: string, body: unknown, requireAuth = false): Promise<T> {
    return request<T>(endpoint, { method: 'PUT', body, requireAuth });
  },

  delete<T>(endpoint: string, requireAuth = false): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE', requireAuth });
  },
};
