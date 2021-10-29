import 'reflect-metadata';

import dotenv from 'dotenv';

import { startHttpServer } from '~/start/httpServer';

async function bootstrap() {
  dotenv.config();

  await startHttpServer();
}

bootstrap();
