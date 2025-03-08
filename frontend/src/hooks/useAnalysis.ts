import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface Material {
  materialName: string;
  sustainabilityScore: number;
  notes: string;
}

interface AnalysisResult {
  productTitle: string;
  ecoScore: number;
  summary: string;
  carbonFootprint: number;
  waterUsage: number;
  materials: Material[];
}

interface AuthResult {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const useAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  };

  const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setAuthLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Verificar si la respuesta es HTML (error del servidor)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(`Error del servidor (${response.status}): No se pudo procesar el login`);
        }
        throw new Error('Credenciales incorrectas');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setAuthToken(data.token);
        return data;
      } else {
        throw new Error('Respuesta del servidor en formato incorrecto');
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setAuthLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        // Verificar si la respuesta es HTML (error del servidor)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(`Error del servidor (${response.status}): No se pudo procesar el registro`);
        }
        
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error en el registro');
        } catch {
          throw new Error('Error en el registro');
        }
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        throw new Error('Respuesta del servidor en formato incorrecto');
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const analyzeProduct = async (description: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No estás autenticado. Por favor inicia sesión.');
      }

      const response = await fetch(`${API_BASE_URL}/analysis/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          removeAuthToken();
          throw new Error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        }
        
        // Verificar si la respuesta es HTML (error del servidor)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(`Error del servidor (${response.status}): No se pudo procesar la solicitud`);
        }
        
        throw new Error('Error al analizar el producto');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error('Respuesta del servidor en formato incorrecto');
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAnalysisHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No estás autenticado. Por favor inicia sesión.');
      }

      const response = await fetch(`${API_BASE_URL}/analysis`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          removeAuthToken();
          throw new Error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        }
        
        // Verificar si la respuesta es HTML (error del servidor)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(`Error del servidor (${response.status}): No se pudo obtener el historial`);
        }
        
        throw new Error('Error al obtener el historial');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        throw new Error('Respuesta del servidor en formato incorrecto');
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  const logout = () => {
    removeAuthToken();
    setResult(null);
    setError(null);
  };

  return { 
    result, 
    loading, 
    error, 
    authLoading,
    analyzeProduct, 
    setResult,
    login,
    register,
    getAnalysisHistory,
    isAuthenticated,
    logout
  };
};
