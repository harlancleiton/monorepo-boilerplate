export async function startHttpServer() {
  const fastify = await (await import('fastify')).fastify();

  fastify.register(import('./routes/v1'), { prefix: 'v1' });

  fastify.listen(3333, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
  });
}
