/**
 * Tipos centralizados del dominio de la aplicación.
 * Single Source of Truth para interfaces compartidas.
 */

// ============================================================================
// ANÁLISIS DE PRODUCTO
// ============================================================================

export interface MaterialAnalysis {
  materialName: string;
  sustainabilityScore: number;
  notes: string;
}

export interface EndOfLifeInfo {
  recyclable: boolean;
  notes: string;
}

export interface AIAnalysisResponse {
  productTitle: string;
  estimatedCarbonFootprintKg: number;
  estimatedWaterUsageLiters: number;
  materialsAnalysis: MaterialAnalysis[];
  endOfLife: EndOfLifeInfo;
  overallSummary: string;
}

export interface EcoScoreInput {
  estimatedCarbonFootprintKg: number;
  estimatedWaterUsageLiters: number;
  materialsAnalysis: Pick<MaterialAnalysis, 'sustainabilityScore'>[];
}

// ============================================================================
// USUARIO Y AUTENTICACIÓN
// ============================================================================

export interface UserPayload {
  id: number;
  email: string;
  name: string | null;
}

export interface JWTPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export interface AuthTokenResponse {
  token: string;
  user: UserPayload;
}

// ============================================================================
// RESPUESTAS DE API
// ============================================================================

export interface ApiErrorResponse {
  error: string;
  details?: string[];
}

export interface ApiSuccessMessage {
  message: string;
}
