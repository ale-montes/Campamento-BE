import { BadRequestError } from './errors/http-error.js';

export function validateId(id: unknown): number {
  const num = Number(id);

  if (!Number.isInteger(num) || num <= 0) {
    throw new BadRequestError('Invalid ID format');
  }

  return num;
}
