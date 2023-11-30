import { Encrypt } from "../../../data/protocols/encrypt";
import { CryptoEncrypt } from "../../../infra/encrypt/crypto-encrypt";

export const makeCryptoEncrypt = (): Encrypt => new CryptoEncrypt();