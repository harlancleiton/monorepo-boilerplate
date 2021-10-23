import { Router } from 'express';

import { applyRegisterRoutes } from './applyRegisterRoutes';

export function authApplyRoutes(router: Router) {
  applyRegisterRoutes(router);
}
