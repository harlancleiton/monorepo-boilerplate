export interface HashContract {
  make(value: string): Promise<string>;
  verify(hashedValue: string): Promise<boolean>;
}
