import { describe, expect, it } from 'vitest';
import RemoteAccountValidationZod from "../../../src/infra/zod/remote-account-validation-zod";
import { requestCreateAccount } from '../../domain/mocks/remote-account';

export const makeSut = (): RemoteAccountValidationZod =>
    new RemoteAccountValidationZod();

describe('RemoteAccountValidationZod', () => {
    it('Should be successfull create account', () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        expect(() => sut.createAccount(request)).resolves.toBeUndefined();
    });
});