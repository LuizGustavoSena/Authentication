import { faker } from "@faker-js/faker";
import { describe, expect, it } from 'vitest';
import { CryptoEncrypt } from "../../../src/infra/encrypt/crypto-encrypt";

type Props = {
    sut: CryptoEncrypt;
}

const makeSut = (): Props => {
    const sut = new CryptoEncrypt();

    return {
        sut
    };
}

describe('CryptoEncrypt', () => {
    it('Should correct encrypt', () => {
        const { sut } = makeSut();

        const words = faker.word.words();

        const response = sut.encrypt(words);

        expect(response).not.toBe(words);
    });

    it('Should correct decrypt', () => {
        const { sut } = makeSut();

        const words = faker.word.words();

        const encrypt = sut.encrypt(words);

        const decrypt = sut.decrypt(encrypt);

        expect(decrypt).toBe(words);
    });
});