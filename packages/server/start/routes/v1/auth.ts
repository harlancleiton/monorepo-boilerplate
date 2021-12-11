import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { fastifyAdaptRoute } from '~/common';
import {
  makeSessionController,
  makeRegisterController,
  makeRenoveSessionController
} from '~/modules/auth/main';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.post('/register', opts, fastifyAdaptRoute(makeRegisterController()));
  fastify.post(
    '/renove-session',
    opts,
    fastifyAdaptRoute(makeRenoveSessionController())
  );
  fastify.post('/sessions', opts, fastifyAdaptRoute(makeSessionController()));

  done();
}
