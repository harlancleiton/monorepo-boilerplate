import * as crypto from 'crypto';

import { EncrypterContract } from '~/common';
import { EncrypterConfigContract } from '~/config/encrypter';

export class Aes256CbcEncrypterAdapter implements EncrypterContract {
  constructor(
    private readonly encrypterConfig: EncrypterConfigContract.Aes256CbcConfig
  ) {}

  public encrypt(plaintext: string): string {
    const iv = Buffer.from(crypto.randomBytes(this.encrypterConfig.ivLength));
    const secretBuffer = Buffer.from(this.encrypterConfig.secret);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretBuffer, iv);

    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);

    const ivParsed = iv.toString('hex');
    const encryptedParsed = encrypted.toString('hex');
    const encryptedWithIv = `${ivParsed}.${encryptedParsed}`;

    return encryptedWithIv;
  }

  public decrypt(encrypted: string): string {
    const [iv, encryptedText] = encrypted.split('.');

    const ivBuffer = Buffer.from(iv, 'hex');
    const secretBuffer = Buffer.from(this.encrypterConfig.secret);

    const decipher = crypto.createDecipheriv(
      'aes-256-cdc',
      secretBuffer,
      ivBuffer
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final()
    ]);

    return decrypted.toString();
  }
}
