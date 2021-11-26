import { FastifyRequest } from 'fastify';

import { RequestContract } from '~/common/presentation';

export class FastifyRequestAdapter implements RequestContract {
  constructor(private readonly request: FastifyRequest) {}

  public body<T = any>(): T {
    return this.request.body as T;
  }

  public params<T = Record<string, string>>(): T {
    return this.request.params as T;
  }

  public param<T = string>(key: string, defaultValue?: T): T {
    return this.request.params[key] || (defaultValue as any);
  }

  public query<T = Record<string, string>>(): T {
    return this.request.query as any;
  }
}
