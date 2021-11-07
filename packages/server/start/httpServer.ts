import { appConfig } from '~/config/app';

export async function startHttpServer() {
  const fastify = await (await import('fastify')).fastify();

  fastify.register(import('./routes/v1'), { prefix: 'v1' });

  fastify.listen(appConfig.port, appConfig.host, (err, address) => {
    if (err) {
      fastify.close();
      process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log('Server is running on address:', address);
  });
}