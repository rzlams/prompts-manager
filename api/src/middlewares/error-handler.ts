import { NextFunction, Request, Response } from 'express';

interface ApiError extends Error {
  code?: string;
  data?: any;
}

export default function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
  const status = err.code === 'NOT_FOUND' ? 404 : err.code === 'INVALID_NAME' ? 400 : 500;
  res.status(status).json({
    message: 'OK',
    error: {
      data: err.data || {},
      code: err.code || 'INTERNAL_ERROR',
    },
  });
}
