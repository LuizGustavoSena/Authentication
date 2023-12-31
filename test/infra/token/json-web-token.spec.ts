import { faker } from "@faker-js/faker";
import { describe, expect, it } from 'vitest';
import { JsonWebToken } from "../../../src/infra/token/json-web-token";

type Props = {
    sut: JsonWebToken;
}
const makeSut = () => {
    const sut = new JsonWebToken();

    return {
        sut
    }
}

describe('JsonWebToken', () => {
    it('Should correct token', () => {
        const { sut } = makeSut();

        const email = faker.internet.email();

        const response = sut.generate({ email });

        const validToken = sut.validate(response.token);

        expect(response.token).toString();
        expect(validToken.email).toBe(email);
    });

    it('Should correct token with validate method', () => {
        const { sut } = makeSut();

        const response = sut.generate({
            email: faker.internet.email()
        });

        const validatedToken = sut.validate(response.token);

        expect(validatedToken).not.toBeNull();
    });

    it('Should invalid token with validate method', () => {
        const { sut } = makeSut();

        const any_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

        const validatedToken = sut.validate(any_token);

        expect(validatedToken).toBeNull();
    });

    it('Should invalid token expirated', () => {
        const { sut } = makeSut();

        sut.expirationInMilliseconds = - 10;

        const response = sut.generate({
            email: faker.internet.email()
        });

        const validatedToken = sut.validate(response.token);

        expect(validatedToken).toBeNull();
    });
});