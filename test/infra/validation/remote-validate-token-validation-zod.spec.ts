import { faker } from "@faker-js/faker";
import { describe, expect, it } from 'vitest';
import { ValidationError } from "../../../src/domain/error/validation-error";
import RemoteValidateTokenValidationZod from "../../../src/infra/zod/remote-validate-token-validation-zod";

export const makeSut = (): RemoteValidateTokenValidationZod =>
    new RemoteValidateTokenValidationZod();

describe('RemoteValidateTokenValidationZod', () => {
    it('Should be successfull validate token', () => {
        const sut = makeSut();

        expect(() => sut.validateToken(faker.string.uuid())).not.toThrow(ValidationError);
    });
});