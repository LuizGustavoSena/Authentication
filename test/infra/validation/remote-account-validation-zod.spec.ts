import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { ValidationError } from '../../../src/domain/error/validation-error';
import RemoteAccountValidationZod from "../../../src/infra/zod/remote-account-validation-zod";
import { requestCreateAccount, requestLoginAccount } from '../../domain/mocks/remote-account';

export const makeSut = (): RemoteAccountValidationZod =>
    new RemoteAccountValidationZod();

describe('RemoteAccountValidationZod', () => {
    it('Should be successfull create account', () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        expect(() => sut.createAccount(request)).not.toThrow();
    });

    it('Should be error when create account with another email type', () => {
        const sut = makeSut();

        const request = {
            ...requestCreateAccount(),
            email: faker.string.sample()
        };

        expect(() => sut.createAccount(request)).toThrow(ValidationError);
    });

    it('Should be error when create account with few letters in password', () => {
        const sut = makeSut();

        const request = {
            ...requestCreateAccount(),
            password: faker.internet.password().slice(0, 4)
        };

        expect(() => sut.createAccount(request)).toThrow(ValidationError);
    });

    it('Should be error when create account without username', () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        delete request.username;

        expect(() => sut.createAccount(request)).toThrow(ValidationError);
    });

    it('Should be error when create account without email', () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        delete request.email;

        expect(() => sut.createAccount(request)).toThrow(ValidationError);
    });

    it('Should be error when create account without password', () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        delete request.password;

        expect(() => sut.createAccount(request)).toThrow(ValidationError);
    });

    it('Should be successfull login account', () => {
        const sut = makeSut();

        const request = requestLoginAccount();

        expect(() => sut.loginAccount(request)).not.toThrow();
    });

    it('Should be error when login account with another email type', () => {
        const sut = makeSut();

        const request = {
            ...requestLoginAccount(),
            email: faker.string.sample()
        };

        expect(() => sut.loginAccount(request)).toThrow(ValidationError);
    });

    it('Should be error when login account without email', () => {
        const sut = makeSut();

        const request = requestLoginAccount();

        delete request.email;

        expect(() => sut.loginAccount(request)).toThrow(ValidationError);
    });
});