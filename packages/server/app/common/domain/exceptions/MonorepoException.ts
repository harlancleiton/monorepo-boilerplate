export class MonorepoException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number
  ) {
    super();

    this.initMessage();
    this.initName();
  }

  public initMessage() {
    if (typeof this.response === 'string') {
      this.message = this.response;
    } else if (
      this.response.message &&
      typeof this.response.message === 'string'
    ) {
      this.message = this.response.message;
    } else {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    }
  }

  public initName(): void {
    this.name = this.constructor.name;
  }

  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

  public static createBody(
    objectOrError: object | string,
    description?: string,
    statusCode?: number
  ) {
    if (!objectOrError) return { statusCode, message: description };

    return typeof objectOrError === 'object' && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
