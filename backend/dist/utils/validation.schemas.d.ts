import { z } from 'zod';
export declare const AIResponseSchema: z.ZodObject<{
    productTitle: z.ZodString;
    estimatedCarbonFootprintKg: z.ZodNumber;
    estimatedWaterUsageLiters: z.ZodNumber;
    materialsAnalysis: z.ZodArray<z.ZodObject<{
        materialName: z.ZodString;
        sustainabilityScore: z.ZodNumber;
        notes: z.ZodString;
    }, z.core.$strip>>;
    endOfLife: z.ZodObject<{
        recyclable: z.ZodBoolean;
        notes: z.ZodString;
    }, z.core.$strip>;
    overallSummary: z.ZodString;
}, z.core.$strip>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export declare const AnalysisInputSchema: z.ZodObject<{
    description: z.ZodString;
}, z.core.$strip>;
export type AnalysisInput = z.infer<typeof AnalysisInputSchema>;
export declare const UserRegistrationSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export declare const UserLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
//# sourceMappingURL=validation.schemas.d.ts.map