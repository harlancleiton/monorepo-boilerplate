import 'reflect-metadata';

import dotenv from 'dotenv';

import { PrismaClientConnection } from '~/common';
import { startServer } from '~/start/server';

async function bootstrap() {
  dotenv.config();

  const prisma = PrismaClientConnection.getInstance();

  const server = await startServer();

  server.addHook('onClose', async (instance, done) => {
    await prisma.$disconnect();

    done();
  });
}

bootstrap();
