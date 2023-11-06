import { describe, expect, it } from 'vitest';
import { RemoteAccount } from "../../../src/data/use-cases/remote-create-account";
import { SameEmailError } from '../../../src/domain/error/same-email-error';
import { BdClientSpy } from "../mocks/mock-bd";

type Props = {
    sut: RemoteAccount;
    bdClietnSpy: BdClientSpy;
}

const makeSut = () => {
    const bdClietnSpy = new BdClientSpy();
    const sut = new RemoteAccount(bdClietnSpy);

    return {
        sut,
        bdClietnSpy
    }
}

describe('RemoteAccount', () => {
    it('Should correct params', async () => {
        const { sut, bdClietnSpy } = makeSut();

        const request = {
            email: 'any_email',
            password: 'any_password',
            username: 'any_username'
        }

        await sut.createAccount(request);

        expect(bdClietnSpy.body).toEqual(request);
        expect(bdClietnSpy.model).toBe('User');
    });

    it('Should throw erros with equal email', async () => {
        const { sut, bdClietnSpy } = makeSut();

        const email = 'any_email';

        await sut.createAccount({
            email,
            password: 'any_password',

            username: 'any_username'
        });

        const promise = sut.createAccount({
            email,
            password: 'another_password',

            username: 'another_username'
        });

        await expect(promise).rejects.toThrow(new SameEmailError());
        expect(bdClietnSpy.results.User.length).toBe(1);
    });
})