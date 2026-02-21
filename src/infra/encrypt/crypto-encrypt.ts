
import crypto from 'crypto';
import { Encrypt } from "../../data/protocols/encrypt";
import { env } from '../zod/env';

export class CryptoEncrypt implements Encrypt {
    key = crypto
        .createHash('sha512')
        .update(env.SECRET_KEY_ENCRYPT)
        .digest('hex')
        .substring(0, 32);

    encryptionIV = crypto
        .createHash('sha512')
        .update(env.SECRET_IV_ENCRYPT)
        .digest('hex')
        .substring(0, 16)

    encrypt = (data: string): string => {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.encryptionIV);

        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64');
    };

    decrypt = (data: string): string => {
        const buff = Buffer.from(data, 'base64');

        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.encryptionIV);

        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        );
    };
}