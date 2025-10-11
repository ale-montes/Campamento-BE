import { UserPayload } from './user';

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
