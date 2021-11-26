export interface EncrypterContract {
  encrypt(plaintext: string): string;
  decrypt(encrypted: string): string;
}
