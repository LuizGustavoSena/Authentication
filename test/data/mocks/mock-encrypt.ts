import { Encrypt } from "../../../src/data/protocols/encrypt";

export class EncryptSpy implements Encrypt {
    data: string;
    encrypt(data: string): string {
        const encrypt = `${data}encrypt`
        this.data = encrypt;

        return this.data;
    }
    decrypt(data: string): string {
        const decrypt = data.replace('encrypt', '');

        this.data = decrypt;

        return this.data;
    }
}