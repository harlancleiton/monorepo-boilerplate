import 'reflect-metadata';

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import { startServer } from '~/start/server';

async function bootstrap() {
  dotenv.config();

  await createConnection();
  await startServer();
}

bootstrap();
