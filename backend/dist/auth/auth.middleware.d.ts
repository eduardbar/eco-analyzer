import type { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
    };
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map