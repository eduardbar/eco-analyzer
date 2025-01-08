import { z } from 'zod';

// Schema de validación para la respuesta de IA
export const AIResponseSchema = z.object({
  productTitle: z.string().min(1, 'Product title is required'),
  estimatedCarbonFootprintKg: z.number().min(0, 'Carbon footprint must be positive'),
  estimatedWaterUsageLiters: z.number().min(0, 'Water usage must be positive'),
  materialsAnalysis: z.array(z.object({
    materialName: z.string().min(1, 'Material name is required'),
    sustainabilityScore: z.number().min(1).max(10, 'Sustainability score must be between 1 and 10'),
    notes: z.string().min(1, 'Notes are required')
  })).min(1, 'At least one material analysis is required'),
  endOfLife: z.object({
    recyclable: z.boolean(),
    notes: z.string().min(1, 'End of life notes are required')
  }),
  overallSummary: z.string().min(10, 'Overall summary must be at least 10 characters')
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

// Schema para validación de entrada del análisis
export const AnalysisInputSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long')
});

export type AnalysisInput = z.infer<typeof AnalysisInputSchema>;

// Schema para validación de registro de usuario
export const UserRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long')
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

// Schema para validación de login
export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
