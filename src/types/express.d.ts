// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
        email: string;
      };
    }
  }
}
export {};
