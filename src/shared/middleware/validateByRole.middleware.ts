// src/middlewares/validateRequestByRole.ts
import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../../types/user.js';

type SchemasByRole = Record<string, ZodSchema>;

export function validateRequestByRole(schemas: SchemasByRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayload | undefined;
    const role = user?.role ?? 'campista';
    const schema = schemas[role];

    if (!schema) {
      console.warn(`No se encontró schema de entrada para el rol "${role}"`);
      return next();
    }

    try {
      const parsed = schema.parse(req.body);
      req.body.sanitizedInput = parsed; // reemplaza body por datos validados y sanitizados
      next();
    } catch (err) {
      return res.status(400).json({
        message: 'Error de validación de entrada',
        details: err instanceof ZodError ? err.errors : undefined,
      });
    }
  };
}

interface ApiResponse<T = unknown> {
  message?: string;
  data?: T | T[];
}

export function validateResponseByRole(schemas: SchemasByRole) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json.bind(res);

    res.json = function <T>(body: ApiResponse<T>): Response {
      const user = req.user as UserPayload | undefined;
      const role = user?.role ?? 'campista';
      const schema = schemas[role];

      if (!schema) {
        console.warn(` No se encontró schema de salida para el rol "${role}"`);
        return originalJson(body);
      }

      try {
        if (body && 'data' in body) {
          const { data } = body as Required<ApiResponse<T>>;

          if (Array.isArray(data)) {
            const validatedData = data.map((item) => schema.parse(item));
            return originalJson({ ...body, data: validatedData });
          }

          if (data && typeof data === 'object') {
            const validatedData = schema.parse(data);
            return originalJson({ ...body, data: validatedData });
          }
        }

        return originalJson(body);
      } catch (err) {
        const message =
          err instanceof ZodError
            ? 'Error de validación en la respuesta del servidor'
            : 'Error procesando la respuesta del servidor';

        return res.status(500).json({
          message,
          details: err instanceof ZodError ? err.errors : undefined,
        });
      }
    };

    next();
  };
}
