import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }

  if (err instanceof Error) {
    const statusCode = (err as ApiError).statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
      error: message,
      details: (err as ApiError).details,
    });
  }

  res.status(500).json({ error: 'Internal server error' });
};
