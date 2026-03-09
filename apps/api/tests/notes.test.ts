import request from 'supertest';
import { prisma } from '../src/db';
import { app } from '../src/index';

const api = request(app);

async function createUserAndToken() {
  const email = `notes-${Date.now()}@example.com`;
  const password = 'password123';

  const res = await api.post('/users/register').send({
    email,
    password,
    name: 'Notes User',
  });

  return { token: res.body.token as string };
}

describe('Notes routes', () => {
  it('creates and fetches notes for the logged-in user', async () => {
    const { token } = await createUserAndToken();

    const createRes = await api
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My first note',
        content: 'Hello world',
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.title).toBe('My first note');

    const listRes = await api
      .get('/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

