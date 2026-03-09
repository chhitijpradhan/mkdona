import request from 'supertest';
import { prisma } from '../src/db';
import { app } from '../src/index';

const api = request(app);

describe('Auth routes', () => {
  it('registers a new user and returns token', async () => {
    const email = `test-${Date.now()}@example.com`;

    const res = await api.post('/users/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(email);
  });

  it('logs in an existing user and returns token', async () => {
    const email = `login-${Date.now()}@example.com`;
    const password = 'password123';

    const register = await api.post('/users/register').send({
      email,
      password,
      name: 'Login User',
    });
    expect(register.status).toBe(201);

    const res = await api.post('/users/login').send({
      email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(email);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

