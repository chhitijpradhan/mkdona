import { Router } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { prisma } from '../db';
import { registerSchema, loginSchema } from '../schemas/auth';
import { signToken } from '../lib/jwt';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

function omitPassword<T extends { password?: string }>(user: T) {
  const { password: _, ...rest } = user;
  return rest;
}

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

// POST /users/register
router.post('/register', authLimiter, async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        password: hashedPassword,
      },
    });
    const token = signToken({ userId: user.id });
    res.status(201).json({ user: omitPassword(user), token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Failed to register' });
  }
});

// POST /users/login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = signToken({ userId: user.id });
    res.json({ user: omitPassword(user), token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to login' });
  }
});

// GET /users/profile (protected)
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).send();
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;
