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

type RoleSchemas = {
  [role: string]: ZodSchema;
};

export const validateSchemaByRole = (schemas: RoleSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !schemas[role]) {
      return res.status(403).json({ message: 'Rol no válido o sin schema definido' });
    }
    return validateSchema(schemas[role])(req, res, next);
  };
};
