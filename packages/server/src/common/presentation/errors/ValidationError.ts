export class ValidationError {
  constructor(
    public field: string,
    public value: string,
    public validation: ValidationError.Rules,
    public children: ValidationError[] = []
  ) {}
}

export namespace ValidationError {
  export type Rules = Partial<{
    isEmail: string;
    isString: string;

    [key: string]: string;
  }>;
}
