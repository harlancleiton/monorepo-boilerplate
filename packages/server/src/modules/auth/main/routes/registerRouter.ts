import { Router } from 'express';

import { adaptRoute } from '~/common';

import { makeRegisterController } from '../factories';

export function registerRouter(router: Router) {
  router.post('/users', adaptRoute(makeRegisterController()));
}
