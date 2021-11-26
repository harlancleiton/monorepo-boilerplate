import { Aes256CbcEncrypterAdapter } from '~/common/infra';
import { encrypterConfig } from '~/config/encrypter';

export function makeEncrypterAdapter() {
  return new Aes256CbcEncrypterAdapter(
    encrypterConfig.encrypters['aes-256-cbc']
  );
}
