import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { RefreshTokenUseCase } from '../../../src/data/use-cases/refresh-token';
import { RemoteAccount } from "../../../src/data/use-cases/remote-account";
import { SameEmailError } from '../../../src/domain/error/same-email-error';
import { UnauthorizedError } from '../../../src/domain/error/unauthorized-error';
import { requestCreateUser, requestLoginAccount } from '../../domain/mocks/remote-account';
import { BdClientSpy } from "../mocks/mock-bd";
import { EncryptSpy } from '../mocks/mock-encrypt';
import { GuidSpy } from '../mocks/mock-guid';
import { TokenSpy } from '../mocks/mock-token';

type Props = {
    sut: RemoteAccount;
    bdClietnSpy: BdClientSpy;
    tokenSpy: TokenSpy;
    cryptSpy: EncryptSpy;
    refreshToken: RefreshTokenUseCase;
}

const makeSut = (): Props => {
    const bdClietnSpy = new BdClientSpy();
    const tokenSpy = new TokenSpy();
    const cryptSpy = new EncryptSpy();
    const guidSpy = new GuidSpy();

    const refreshToken = new RefreshTokenUseCase(guidSpy, bdClietnSpy, tokenSpy);
    const sut = new RemoteAccount(bdClietnSpy, tokenSpy, cryptSpy, guidSpy, refreshToken);

    return {
        sut,
        bdClietnSpy,
        tokenSpy,
        cryptSpy,
        refreshToken
    }
}

describe('RemoteAccount', () => {
    it('Should correct params', async () => {
        const { sut, bdClietnSpy, cryptSpy } = makeSut();

        const request = requestCreateUser();

        await sut.createAccount(request);

        expect(cryptSpy.decrypt(bdClietnSpy.body.email)).toBe(request.email);
        expect(cryptSpy.decrypt(bdClietnSpy.body.password)).toBe(request.password);
        expect(bdClietnSpy.body.username).toBe(request.username);
    });

    it('Should throw erros with equal email', async () => {
        const { sut, bdClietnSpy } = makeSut();

        const email = faker.internet.email();

        const request = requestCreateUser({ email });

        const anotherRequest = requestCreateUser({ email });

        await sut.createAccount(request);

        const promise = sut.createAccount(anotherRequest);

        await expect(promise).rejects.toThrow(new SameEmailError());
        expect(bdClietnSpy.users.length).toBe(1);
    });

    it('Should be successfull get token with correct authentication', async () => {
        const { sut, tokenSpy } = makeSut();

        const createRequest = requestCreateUser();
        const loginRequest = requestLoginAccount({
            email: createRequest.email,
            password: createRequest.password
        });

        await sut.createAccount(createRequest);

        const response = await sut.loginAccount(loginRequest);

        expect(tokenSpy.token).toBe(`${createRequest.email}token`);
        expect(response.token).toBe(tokenSpy.token);
    });

    it('Should correct error with invalid credential', async () => {
        const { sut } = makeSut();

        const request = requestCreateUser();
        const anotherAccount = requestLoginAccount();

        await sut.createAccount(request);

        await expect(sut.loginAccount(anotherAccount)).rejects.toThrow(new UnauthorizedError());
    });
});