import fastify from 'fastify';

export async function startHttpServer() {
  const server = fastify();

  server.register(import('~/modules/auth/main/routes'));

  server.listen(3333, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
  });
}
