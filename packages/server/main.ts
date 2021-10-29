import { startHttpServer } from '~/start/httpServer';

async function bootstrap() {
  await startHttpServer();
}

bootstrap();
