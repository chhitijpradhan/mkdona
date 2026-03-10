import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import { prisma } from './db';
import notesRouter from './routes/notes';
import usersRouter from './routes/users';
import aiRouter from "./routes/ai"
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/ai",aiRouter)

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
