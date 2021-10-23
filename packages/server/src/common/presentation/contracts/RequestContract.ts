export interface RequestContract {
  body<T = any>(): T;
  params<T = Record<string, string>>(): T;
  param<T = string>(key: string, defaultValue?: T): T;
  query<T = Record<string, string>>(): T;
}
