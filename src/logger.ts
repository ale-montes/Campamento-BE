import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper para rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta donde se guardarán los logs
const logDir = path.join(__dirname, '../logs');

// Formato JSON para archivos
const jsonFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Configuración de transports
const transports: winston.transport[] = [
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d',
    level: 'info',
    format: jsonFormat,
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error',
    format: jsonFormat,
  }),
];

// Crear logger
export const logger = winston.createLogger({
  level: 'info',
  transports,
});
