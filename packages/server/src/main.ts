import express, { Router } from 'express';

import { authApplyRoutes } from './modules/auth';

function applyRoutes(router: Router) {
  authApplyRoutes(router);
}

async function bootstrap() {
  const app = express();

  app.use(express.json());

  const router = Router();
  applyRoutes(router);
  app.use(router);

  app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
  });
}

bootstrap();
