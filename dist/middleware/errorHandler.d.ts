import type { Request, Response, NextFunction } from 'express';
interface ApiError extends Error {
    statusCode?: number;
    details?: unknown;
}
export declare const errorHandler: (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=errorHandler.d.ts.map