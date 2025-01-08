import type { Response } from 'express';
import type { AuthenticatedRequest } from '../auth/auth.middleware';
export declare const handleAnalyzeProduct: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAnalysisHistory: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=analysis.controller.d.ts.map