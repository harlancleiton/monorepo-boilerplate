import { Aes256CdcEncrypterAdapter } from '~/common/infra';
import { encrypterConfig } from '~/config/encrypter';

export function makeEncrypterAdapter() {
  return new Aes256CdcEncrypterAdapter(
    encrypterConfig.encrypters['aes-256-cbc']
  );
}
