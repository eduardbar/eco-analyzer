"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UserRegistrationSchema = exports.AnalysisInputSchema = exports.AIResponseSchema = void 0;
const zod_1 = require("zod");
// Schema de validación para la respuesta de IA
exports.AIResponseSchema = zod_1.z.object({
    productTitle: zod_1.z.string().min(1, 'Product title is required'),
    estimatedCarbonFootprintKg: zod_1.z.number().min(0, 'Carbon footprint must be positive'),
    estimatedWaterUsageLiters: zod_1.z.number().min(0, 'Water usage must be positive'),
    materialsAnalysis: zod_1.z.array(zod_1.z.object({
        materialName: zod_1.z.string().min(1, 'Material name is required'),
        sustainabilityScore: zod_1.z.number().min(1).max(10, 'Sustainability score must be between 1 and 10'),
        notes: zod_1.z.string().min(1, 'Notes are required')
    })).min(1, 'At least one material analysis is required'),
    endOfLife: zod_1.z.object({
        recyclable: zod_1.z.boolean(),
        notes: zod_1.z.string().min(1, 'End of life notes are required')
    }),
    overallSummary: zod_1.z.string().min(10, 'Overall summary must be at least 10 characters')
});
// Schema para validación de entrada del análisis
exports.AnalysisInputSchema = zod_1.z.object({
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long')
});
// Schema para validación de registro de usuario
exports.UserRegistrationSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long')
});
// Schema para validación de login
exports.UserLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required')
});
//# sourceMappingURL=validation.schemas.js.map