import type { Request, Response, NextFunction } from 'express';
import { HttpError, InternalServerError } from '../errors/http-error.js';

export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  // Primero detectamos JSON malformado
  if (err instanceof SyntaxError && 'body' in err) {
    console.error(`[JSON Error] [${req.method}] ${req.url} → ${err.message}`);
    res.status(400).json({
      success: false,
      error: {
        type: 'JsonSyntaxError',
        message: 'JSON inválido',
      },
    });
    return;
  }

  // Errores esperados (instancias de HttpError)
  if (err instanceof HttpError) {
    logError(err, req);
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: err.name,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Errores inesperados
  const unknownError =
    err instanceof Error ? new InternalServerError(err.message) : new InternalServerError('Unknown error', err);

  logError(unknownError, req);
  res.status(500).json({
    success: false,
    error: {
      type: unknownError.name,
      message: unknownError.message,
    },
  });
}

function logError(error: HttpError, req: Request): void {
  console.error(`[${req.method}] ${req.url} → ${error.name}: ${error.message}`);
}
