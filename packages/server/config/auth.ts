import { UserModel } from '~/modules/users/domain';

import { appConfig } from './app';

export const authConfig: AuthConfig = {
  default: 'jwt',

  drivers: {
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_IN || '5m',
      secret: process.env.JWT_SECRET_KEY,
      subject: 'id',
      issuer: appConfig.name
    }
  }
};

export declare namespace AuthConfigContract {
  type JwtConfig = {
    expiresIn: string;
    secret: string;
    subject: keyof UserModel;
    issuer: string;
  };

  interface AuthProviders {
    jwt: {
      config: JwtConfig;
    };
  }
}

export interface AuthConfig {
  default: keyof AuthConfigContract.AuthProviders;
  drivers: {
    [P in keyof AuthConfigContract.AuthProviders]: AuthConfigContract.AuthProviders[P]['config'];
  };
}
