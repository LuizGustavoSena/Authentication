import { describe, expect, it } from 'vitest';
import { RemoteCreateAccount } from "../../../src/data/use-cases/remote-create-account";
import { BdClientSpy } from "../mocks/mock-bd";

type Props = {
    sut: RemoteCreateAccount;
    bdClietnSpy: BdClientSpy;
}

const makeSut = () => {
    const bdClietnSpy = new BdClientSpy();
    const sut = new RemoteCreateAccount(bdClietnSpy);

    return {
        sut,
        bdClietnSpy
    }
}

describe('RemoteCreateAccount', () => {
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
})