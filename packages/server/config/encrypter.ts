export const encrypterConfig: EncrypterConfig = {
  default: 'aes-256-cbc',

  encrypters: {
    'aes-256-cbc': {
      secret: process.env.ENCRYPTER_SECRET,
      ivLength: 16
    }
  }
};

export declare namespace EncrypterConfigContract {
  type Aes256CbcConfig = {
    secret: string;
    ivLength: number;
  };

  interface EncrypterAlgorithms {
    'aes-256-cbc': {
      config: Aes256CbcConfig;
    };
  }
}

export interface EncrypterConfig {
  default: keyof EncrypterConfigContract.EncrypterAlgorithms;
  encrypters: {
    [P in keyof EncrypterConfigContract.EncrypterAlgorithms]: EncrypterConfigContract.EncrypterAlgorithms[P]['config'];
  };
}
