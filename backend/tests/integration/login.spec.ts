import { test, describe, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../src/index';

process.env.JWT_SECRET =
  '6aee497e203c288c08420c4db3375648390d51a873bf916e8d22d1f32e02f571e3ec57b78bd4be29a9d42cc5953df6c7902f77c560892754954d0efa74d2f154';

import { GenericContainer } from 'testcontainers';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

let container;
let prisma: PrismaClient;

beforeAll(async () => {
  container = await new GenericContainer('postgres')
    .withEnvironment({ POSTGRES_USER: 'test' })
    .withEnvironment({ POSTGRES_PASSWORD: 'test' })
    .withEnvironment({ POSTGRES_DB: 'test' })
    .withExposedPorts({
      container: 5432,
      host: 15432,
    })
    .start();

  const databaseUrl = `postgresql://test:test@localhost:${container.getMappedPort(5432)}/test`;
  process.env.DATABASE_URL = databaseUrl;

  execSync('npx prisma migrate deploy', { env: process.env });
  execSync('ts-node prisma/seed.ts', { env: process.env });

  prisma = new PrismaClient();
  await prisma.$connect();
});

afterAll(async () => {
  await container.stop();
});

describe('Login', () => {
  test('Valid Login returns token', async ({}) => {
    const response = await request(app).post('/api/login').send({
      username: 'demo2',
      password: 'test',
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    // Expect the token when parsed to have the user id
    const token = response.body.token;
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    expect(decoded.userId).toBe('dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272');
  });

  test('Invalid password', async ({}) => {
    const response = await request(app).post('/api/login').send({
      username: 'demo2',
      password: 'wrongpass',
    });
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'invalid username or password',
    });
  });

  test('No username', async ({}) => {
    const response = await request(app).post('/api/login').send({
      password: 'password',
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'username and password fields required',
    });
  });

  test('No password', async ({}) => {
    const response = await request(app).post('/api/login').send({
      username: 'demo2',
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'username and password fields required',
    });
  });

  test('No matching user', async ({}) => {
    const response = await request(app).post('/api/login').send({
      username: 'demo',
      password: 'pass',
    });
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'invalid username or password',
    });
  });
});

describe('Authenticate Token', () => {
  test('Valid token', async ({}) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkY2Y4OWE3ZS1iOTQxLTRmMTctYmJlMC00ZTBjOGIyY2QyNzIiLCJpYXQiOjE3MTA3OTU1NDIsImV4cCI6MTc3MzkxMDc0Mn0.U17p3b4yYdOpfi2C1mh1IkDZqvPF-w_gIBsim-1ga8k';
    const response = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('No token', async ({}) => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'unauthorized' });
  });

  test('Invalid token', async ({}) => {
    const response = await request(app)
      .get('/api/notes')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(403);
    expect(response.body).toStrictEqual({ error: 'forbidden' });
  });
});
