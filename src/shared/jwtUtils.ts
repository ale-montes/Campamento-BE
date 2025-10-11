import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/user.d.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '30d';

export const generateJwtToken = (payload: UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyJwtToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
};

export const decodeJwtToken = (token: string): UserPayload | null => {
  try {
    return jwt.decode(token) as UserPayload;
  } catch (err) {
    console.error('JWT decoding failed:', err);
    return null;
  }
};
