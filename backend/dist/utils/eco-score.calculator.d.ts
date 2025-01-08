interface AIResponseForEcoScore {
    estimatedCarbonFootprintKg: number;
    estimatedWaterUsageLiters: number;
    materialsAnalysis: {
        sustainabilityScore: number;
    }[];
}
export declare const calculateEcoScore: (aiResponse: AIResponseForEcoScore) => number;
export {};
//# sourceMappingURL=eco-score.calculator.d.ts.map