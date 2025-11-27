import { type Request, type Response, type NextFunction } from 'express';
export declare const getAllTasks: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTaskById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=tasks.d.ts.map