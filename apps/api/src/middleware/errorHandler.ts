import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: err.errors });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}

