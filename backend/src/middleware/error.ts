import { Request, Response, NextFunction } from 'express';
import ErrorBase from '../error/ErrorBase';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ErrorBase) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  return res.status(500).json({ error: err.message });
}