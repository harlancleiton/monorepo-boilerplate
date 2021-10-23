import { Response } from 'express';

import { ResponseContract } from '~/common';

export class ExpressResponseAdapter implements ResponseContract {
  constructor(private readonly response: Response) {}

  public ok(body: any): void {
    this.response.status(200).json(body);
  }

  public created(body: any): void {
    this.response.status(201).json(body);
  }

  public noContent(): void {
    this.response.status(204).json();
  }

  public badRequest(body?: any): void {
    this.response.status(400).json(body);
  }

  public unauthorized(body?: any): void {
    this.response.status(401).json(body);
  }

  public paymentRequired(body?: any): void {
    this.response.status(402).json(body);
  }

  public forbidden(body?: any): void {
    this.response.status(403).json(body);
  }

  public notFound(body?: any): void {
    this.response.status(404).json(body);
  }

  public unprocessableEntity(body?: any): void {
    this.response.status(422).json(body);
  }

  public internalServerError(body?: any): void {
    this.response.status(500).json(body);
  }

  public badGateway(body?: any): void {
    this.response.status(502).json(body);
  }

  public status(status: number): this {
    this.response.status(status);

    return this;
  }

  public send(body: any): void {
    this.response.json(body);
  }
}
