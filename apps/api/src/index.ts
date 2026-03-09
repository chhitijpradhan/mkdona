import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from './db';
import notesRouter from './routes/notes';
import usersRouter from './routes/users';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

async function main() {
  await prisma.$connect();
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  const shutdown = async () => {
    server.close(() => {
      prisma.$disconnect().then(() => process.exit(0));
    });
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { app };
