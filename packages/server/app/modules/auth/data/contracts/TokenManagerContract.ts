export interface TokenManagerContract {
  encode(payload: string | Buffer | object): Promise<string>;
  decode<T = any>(token: string): Promise<T>;
}
