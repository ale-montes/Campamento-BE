import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Error de validación',
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    req.body.sanitizedInput = result.data;
    next();
  };
