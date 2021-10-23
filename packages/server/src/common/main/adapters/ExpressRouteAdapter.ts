import { RequestHandler } from 'express';

import {
  ControllerContract,
  ExpressRequestAdapter,
  ExpressResponseAdapter
} from '~/common';

export function adaptRoute(controller: ControllerContract): RequestHandler {
  return async (request, response) => {
    await controller.handle({
      request: new ExpressRequestAdapter(request),
      response: new ExpressResponseAdapter(response)
    });
  };
}
