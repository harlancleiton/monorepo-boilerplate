import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { fastifyAdaptRoute } from '~/common';
import {
  makeSessionController,
  makeRegisterController
} from '~/modules/auth/main';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.post('/register', opts, fastifyAdaptRoute(makeRegisterController()));
  fastify.post('/sessions', opts, fastifyAdaptRoute(makeSessionController()));

  done();
}
