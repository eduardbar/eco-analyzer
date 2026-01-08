import { z } from 'zod';

// ============================================================================
// SCHEMAS DE RESPUESTA DE IA
// ============================================================================

const MaterialAnalysisSchema = z.object({
  materialName: z.string().min(1, 'El nombre del material es requerido'),
  sustainabilityScore: z
    .number()
    .min(0, 'El score debe ser mínimo 0')
    .max(10, 'El score debe ser máximo 10'),
  notes: z.string().min(1, 'Las notas son requeridas'),
});

const EndOfLifeSchema = z.object({
  recyclable: z.boolean(),
  notes: z.string().min(1, 'Las notas de fin de vida son requeridas'),
});

export const AIResponseSchema = z.object({
  productTitle: z.string().min(1, 'El título del producto es requerido'),
  estimatedCarbonFootprintKg: z
    .number()
    .min(0, 'La huella de carbono debe ser positiva'),
  estimatedWaterUsageLiters: z
    .number()
    .min(0, 'El uso de agua debe ser positivo'),
  materialsAnalysis: z
    .array(MaterialAnalysisSchema)
    .min(1, 'Se requiere al menos un análisis de material'),
  endOfLife: EndOfLifeSchema,
  overallSummary: z
    .string()
    .min(10, 'El resumen debe tener al menos 10 caracteres'),
});

export type AIResponseType = z.infer<typeof AIResponseSchema>;

// ============================================================================
// SCHEMAS DE ENTRADA DE ANÁLISIS
// ============================================================================

export const AnalysisInputSchema = z.object({
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción es demasiado larga (máximo 1000 caracteres)'),
});

export type AnalysisInputType = z.infer<typeof AnalysisInputSchema>;

// ============================================================================
// SCHEMAS DE AUTENTICACIÓN
// ============================================================================

export const UserRegistrationSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
});

export type UserRegistrationType = z.infer<typeof UserRegistrationSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;

// ============================================================================
// UTILIDADES DE VALIDACIÓN
// ============================================================================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) => issue.message),
  };
}
