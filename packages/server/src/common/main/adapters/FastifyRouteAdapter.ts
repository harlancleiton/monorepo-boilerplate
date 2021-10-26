import { RouteHandlerMethod } from 'fastify';

import { ControllerContract } from '~/common';

import { FastifyReplyAdapter } from './FastifyReplyAdapter';
import { FastifyRequestAdapter } from './FastifyRequestAdapter';

export function fastifyAdaptRoute(
  controller: ControllerContract
): RouteHandlerMethod {
  return async function (request, reply) {
    await controller.handle({
      request: new FastifyRequestAdapter(request),
      response: new FastifyReplyAdapter(reply)
    });
  };
}
