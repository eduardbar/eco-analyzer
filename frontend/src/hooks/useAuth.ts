/**
 * Hook de autenticación.
 * Maneja login, registro, logout y estado del usuario.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { apiClient, tokenStorage } from '@/services/api.client';
import type { User, AuthResponse, LoginCredentials, RegisterData } from '@/types';

// ============================================================================
// TIPOS
// ============================================================================

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

// ============================================================================
// HOOK
// ============================================================================

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restaurar sesión al montar
  useEffect(() => {
    const savedUser = tokenStorage.getUser<User>();
    const token = tokenStorage.getToken();
    
    if (savedUser && token) {
      setUser(savedUser);
    }
    setIsInitialized(true);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/register', data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback((): void => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: isInitialized && !!user,
    login,
    register,
    logout,
  };
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Verifica si hay una sesión activa (para uso fuera de componentes).
 */
export function isAuthenticated(): boolean {
  return !!tokenStorage.getToken();
}

/**
 * Obtiene el usuario guardado (para uso fuera de componentes).
 */
export function getStoredUser(): User | null {
  return tokenStorage.getUser<User>();
}
