import jwt from 'jsonwebtoken';

const expiresIn = '7d';

const rawSecret = process.env.JWT_SECRET;
const secret: string =
  rawSecret ?? (process.env.NODE_ENV === 'test' ? 'test-secret' : '');

if (!secret) {
  throw new Error('JWT_SECRET environment variable is required');
}

export interface JwtPayload {
  userId: number;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as unknown as JwtPayload;
}
