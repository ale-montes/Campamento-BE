import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
export const jsonErrorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.error('[JSON Error]', err.message);
    res.status(400).json({ message: 'JSON inválido' });
    return;
  }

  console.error('[Unhandled Error]', err);
  res.status(500).json({ message: 'Error interno del servidor' });
};
