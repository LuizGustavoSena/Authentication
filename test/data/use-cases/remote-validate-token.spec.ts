require('dotenv/config');
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { RemoteValidateToken } from "../../../src/data/use-cases/remote-validate-token";
import { InvalidCredentialsError } from '../../../src/domain/error/invalid-credentials-error';
import { TokenSpy } from "../mocks/mock-token";

type Props = {
    sut: RemoteValidateToken;
    tokenSpy: TokenSpy;
};

const makeSut = (): Props => {
    const tokenSpy = new TokenSpy();
    const sut = new RemoteValidateToken(tokenSpy);

    return {
        sut,
        tokenSpy
    }
};

describe('RemoteValidateToken', () => {
    it('Should correct token', () => {
        const { sut, tokenSpy } = makeSut();

        const userId = faker.string.uuid();

        tokenSpy.token = `${userId}token`;

        const response = sut.validate(userId);

        expect(response.userId).toBe(userId);
        expect(response.expires).toBe(response.issued + Number(process.env.EXPIRES_TOKEN_MILLISECONDS));
    });

    it('Should credetials invalid token', () => {
        const { sut, tokenSpy } = makeSut();

        tokenSpy.token = `${faker.internet.email()}token`;

        expect(() => sut.validate(faker.internet.email())).toThrow(new InvalidCredentialsError());
    });
});