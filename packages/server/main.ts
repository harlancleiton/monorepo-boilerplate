import 'reflect-metadata';

import dotenv from 'dotenv';

import { startServer } from '~/start/server';

async function bootstrap() {
  dotenv.config();

  await startServer();
}

bootstrap();
