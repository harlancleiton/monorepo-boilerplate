import { Request } from 'express';

import { RequestContract } from '~/common';

export class ExpressRequestAdapter implements RequestContract {
  constructor(private readonly request: Request) {}

  public body<T = any>(): T {
    return this.request.body;
  }

  public params<T = Record<string, string>>(): T {
    return this.request.params as any;
  }

  public param<T = string>(key: string, defaultValue?: T): T {
    return this.request.params[key] || (defaultValue as any);
  }

  public query<T = Record<string, string>>(): T {
    return this.request.query as any;
  }
}
