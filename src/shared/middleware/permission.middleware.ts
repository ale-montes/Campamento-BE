import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ForbiddenError } from '../errors/http-error.js';

const apiBasePath = process.env.API_BASE_PATH || '/api';

// Para obtener rutas relativas en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const permissionsFile = path.join(__dirname, '../config/permissions.json');

// Carga el JSON de permisos
async function loadPermissions(): Promise<Record<string, Record<string, string[]>>> {
  try {
    const data = await fs.readFile(permissionsFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error leyendo permisos:', err);
    return {};
  }
}

// Middleware de autorización
export async function checkPermission(req: Request, res: Response, next: NextFunction) {
  const role = req.user?.role;
  if (role === 'admin') return next();
  const permissions = await loadPermissions();
  const pathKey = (req.baseUrl + (req.route?.path || '')).replace(apiBasePath + '/', '');
  const method = req.method.toUpperCase();
  const allowedRoles = permissions[pathKey]?.[method];

  if (!allowedRoles) {
    return next(new ForbiddenError('Ruta no definida para tu rol'));
  }

  if (!role || !allowedRoles.includes(role)) {
    return next(new ForbiddenError('Permiso denegado'));
  }
  next();
}
