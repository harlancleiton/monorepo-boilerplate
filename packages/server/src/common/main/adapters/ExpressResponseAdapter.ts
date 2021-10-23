import { Response } from 'express';

import { ResponseContract } from '~/common';

export class ExpressResponseAdapter implements ResponseContract {
  constructor(private readonly response: Response) {}

  ok(body: any): void {
    this.response.status(200).json(body);
  }

  created(body: any): void {
    this.response.status(201).json(body);
  }

  noContent(): void {
    this.response.status(204).json();
  }

  badRequest(body?: any): void {
    this.response.status(400).json(body);
  }

  unauthorized(body?: any): void {
    this.response.status(401).json(body);
  }

  paymentRequired(body?: any): void {
    this.response.status(402).json(body);
  }

  forbidden(body?: any): void {
    this.response.status(403).json(body);
  }

  notFound(body?: any): void {
    this.response.status(404).json(body);
  }

  unprocessableEntity(body?: any): void {
    this.response.status(422).json(body);
  }

  internalServerError(body?: any): void {
    this.response.status(500).json(body);
  }

  badGateway(body?: any): void {
    this.response.status(502).json(body);
  }

  status(status: number): this {
    this.response.status(status);

    return this;
  }

  send(body: any): void {
    this.response.json(body);
  }
}
