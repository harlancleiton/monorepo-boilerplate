import * as argon from 'argon2';

import { HashContract } from '~/common';

export class ArgonHash implements HashContract {
  constructor(private readonly config: argon.Options) {}

  public make(value: string): Promise<string> {
    return argon.hash(value, { ...this.config, raw: false });
  }

  public verify(hashedValue: string, plainTextValue: string): Promise<boolean> {
    return argon.verify(hashedValue, plainTextValue, this.config);
  }
}
