import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { fastifyAdaptRoute } from '~/common';
import { makeRegisterController } from '~/modules/auth/main';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.post('/register', opts, fastifyAdaptRoute(makeRegisterController()));

  done();
}
