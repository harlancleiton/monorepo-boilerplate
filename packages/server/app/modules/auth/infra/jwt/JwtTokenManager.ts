import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { AuthConfigContract } from '~/config/auth';

import { TokenManagerContract } from '../../data';

export class JwtTokenManager implements TokenManagerContract {
  constructor(private readonly options: AuthConfigContract.JwtConfig) {}

  public encode(payload: string | object | Buffer): Promise<string> {
    const sign = promisify(
      jwt.sign as (
        payload: string | Buffer | object,
        secretOrPrivateKey: jwt.Secret,
        options: jwt.SignOptions,
        callback: jwt.SignCallback
      ) => void
    );

    if (typeof payload === 'string' || payload instanceof Buffer)
      return sign(payload, this.options.secret, {
        expiresIn: this.options.expiresIn,
        issuer: this.options.issuer
      });

    const subject = payload[this.options.subject];

    return sign({ sub: subject }, this.options.secret, {
      expiresIn: this.options.expiresIn,
      issuer: this.options.issuer
    });
  }

  public decode<T = any>(token: string): Promise<T> {
    const verify = promisify(
      jwt.verify as (
        token: string,
        secretOrPublicKey: jwt.Secret,
        callback?: jwt.VerifyCallback
      ) => void
    );

    return verify(token, this.options.secret) as Promise<T>;
  }
}
