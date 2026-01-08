/**
 * Tipos centralizados del frontend.
 * Single Source of Truth para interfaces compartidas.
 */

// ============================================================================
// ANÁLISIS
// ============================================================================

export interface Material {
  id?: number;
  materialName: string;
  sustainabilityScore: number;
  notes: string;
}

export interface AnalysisResult {
  id: number;
  productTitle: string;
  ecoScore: number;
  summary: string;
  carbonFootprint: number;
  waterUsage: number;
  createdAt: string;
  materials: Material[];
}

// ============================================================================
// USUARIO Y AUTENTICACIÓN
// ============================================================================

export interface User {
  id: number;
  email: string;
  name: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// ============================================================================
// RESPUESTAS DE API
// ============================================================================

export interface ApiError {
  error: string;
  details?: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ============================================================================
// UI
// ============================================================================

export type ScoreLevel = 'high' | 'medium' | 'low';

export interface ScoreThresholds {
  high: number;
  medium: number;
}
