interface AIResponse {
    productTitle: string;
    estimatedCarbonFootprintKg: number;
    estimatedWaterUsageLiters: number;
    materialsAnalysis: {
        materialName: string;
        sustainabilityScore: number;
        notes: string;
    }[];
    endOfLife: {
        recyclable: boolean;
        notes: string;
    };
    overallSummary: string;
}
export declare class AIClient {
    private static genAI;
    private static getGeminiClient;
    static getAnalysis(description: string): Promise<AIResponse>;
}
export {};
//# sourceMappingURL=ai.client.d.ts.map