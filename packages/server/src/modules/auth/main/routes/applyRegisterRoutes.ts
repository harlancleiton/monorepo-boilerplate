import { Router } from 'express';

import { adaptRoute } from '~/common';

import { makeRegisterController } from '../factories';

export function applyRegisterRoutes(router: Router) {
  router.post('/users', adaptRoute(makeRegisterController()));
}
