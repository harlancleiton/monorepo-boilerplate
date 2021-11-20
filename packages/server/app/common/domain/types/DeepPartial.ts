export type DeepPartial<T> = T extends Primitive
  ? Partial<T>
  : T extends Array<any>
  ? T
  : T extends Set<any>
  ? T
  : T extends ReadonlySet<any>
  ? T
  : T extends Map<any, any>
  ? T
  : T extends ReadonlyMap<any, any>
  ? T
  : T extends (...args: any[]) => unknown
  ? T | undefined
  : T extends object
  ? DeepPartialObject<T>
  : unknown;
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
export type DeepPartialObject<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: DeepPartial<ObjectType[KeyType]>;
};
