declare class AnalysisService {
    analyzeProduct(description: string, userId: number): Promise<{
        materials: {
            id: number;
            materialName: string;
            sustainabilityScore: number;
            notes: string;
            analysisId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productTitle: string;
        ecoScore: number;
        summary: string;
        carbonFootprint: number;
        waterUsage: number;
        userId: number;
    }>;
}
export declare const analysisService: AnalysisService;
export {};
//# sourceMappingURL=analysis.service.d.ts.map