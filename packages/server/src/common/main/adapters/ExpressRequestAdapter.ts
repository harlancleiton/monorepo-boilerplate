import { Request } from 'express';

import { RequestContract } from '~/common';

export class ExpressRequestAdapter implements RequestContract {
  constructor(private readonly request: Request) {}

  body<T = any>(): T {
    return this.request.body;
  }

  params<T = Record<string, string>>(): T {
    return this.request.params as any;
  }

  param<T = string>(key: string, defaultValue?: T): T {
    return this.request.params[key] || (defaultValue as any);
  }
}
