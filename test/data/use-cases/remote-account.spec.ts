import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { RemoteAccount } from "../../../src/data/use-cases/remote-account";
import { SameEmailError } from '../../../src/domain/error/same-email-error';
import { requestCreateAccount, requestLoginAccount } from '../../domain/mocks/remote-account';
import { BdClientSpy } from "../mocks/mock-bd";
import { TokenSpy } from '../mocks/mock-token';

type Props = {
    sut: RemoteAccount;
    bdClietnSpy: BdClientSpy;
    tokenSpy: TokenSpy;
}

const makeSut = (): Props => {
    const bdClietnSpy = new BdClientSpy();
    const tokenSpy = new TokenSpy();
    const sut = new RemoteAccount(bdClietnSpy, tokenSpy);

    return {
        sut,
        bdClietnSpy,
        tokenSpy
    }
}

describe('RemoteAccount', () => {
    it('Should correct params', async () => {
        const { sut, bdClietnSpy } = makeSut();

        const request = requestCreateAccount();

        await sut.createAccount(request);

        expect(bdClietnSpy.body).toEqual(request);
        expect(bdClietnSpy.model).toBe('User');
    });

    it('Should throw erros with equal email', async () => {
        const { sut, bdClietnSpy } = makeSut();

        const email = faker.internet.email();

        const request = requestCreateAccount({ email });

        const anotherRequest = requestCreateAccount({ email });

        await sut.createAccount(request);

        const promise = sut.createAccount(anotherRequest);

        await expect(promise).rejects.toThrow(new SameEmailError());
        expect(bdClietnSpy.results.User.length).toBe(1);
    });

    it('Should token with correct authentication', async () => {
        const { sut, bdClietnSpy, tokenSpy } = makeSut();

        const createRequest = requestCreateAccount();
        const loginRequest = requestLoginAccount({
            email: createRequest.email,
            password: createRequest.password
        });

        await sut.createAccount(createRequest);

        const response = await sut.loginAccount(loginRequest);

        expect(tokenSpy.token).toBe(`${createRequest.email}token`);
        expect(response.token).toBe(tokenSpy.token);
    })
})