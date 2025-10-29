import type { Request, Response, NextFunction } from 'express';
import { logger } from '../../logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const meta = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: duration,
      ip: req.ip,
      // puedes agregar requestId, userId, etc si tienes contexto
    };

    if (res.statusCode >= 500) logger.error('Request failed', meta);
    else if (res.statusCode >= 400) logger.warn('Request warning', meta);
    else logger.info('Request processed', meta);
  });

  next();
}
