import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { PrismaClientConnection } from '~/common';
import { startServer } from '~/start/server';

async function bootstrap() {
  const server = await startServer();

  server.addHook('onClose', async (instance, done) => {
    const prisma = PrismaClientConnection.getInstance();
    await prisma.$disconnect();

    done();
  });
}

bootstrap();
