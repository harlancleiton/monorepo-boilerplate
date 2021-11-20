import fastify from 'fastify';

import { appConfig } from '~/config/app';

export async function startServer() {
  const server = fastify();

  server.register(import('./routes/v1'), { prefix: 'v1' });

  server.listen(appConfig.port, appConfig.host, (error, address) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      server.close();
    }

    // eslint-disable-next-line no-console
    console.log('Server is running on address:', address);
  });

  return server;
}
