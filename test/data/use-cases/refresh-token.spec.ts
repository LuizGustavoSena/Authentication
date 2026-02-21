import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { RefreshTokenUseCase } from "../../../src/data/use-cases/refresh-token";
import { InvalidCredentialsError } from '../../../src/domain/error/invalid-credentials-error';
import { createUser } from '../../domain/mocks/user';
import { BdClientSpy } from "../mocks/mock-bd";
import { GuidSpy } from "../mocks/mock-guid";
import { TokenSpy } from "../mocks/mock-token";

type Props = {
    sut: RefreshTokenUseCase;
    guidSpy: GuidSpy;
    bdClietnSpy: BdClientSpy;
    tokenSpy: TokenSpy;
}

const makeSut = (): Props => {
    const guidSpy = new GuidSpy();
    const bdClietnSpy = new BdClientSpy();
    const tokenSpy = new TokenSpy();

    const sut = new RefreshTokenUseCase(guidSpy, bdClietnSpy, tokenSpy);

    return {
        sut,
        guidSpy,
        bdClietnSpy,
        tokenSpy
    }
}

describe('RefreshTokenUseCase', () => {
    it('Should be successful get a new refresh token', async () => {
        const { sut, guidSpy, bdClietnSpy } = makeSut();

        const guid = faker.string.uuid();
        const userId = faker.string.uuid();

        guidSpy.guid = guid;

        const response = await sut.getRefreshTokenByEmail(userId);

        expect(bdClietnSpy.body.userId).toBe(userId);
        expect(bdClietnSpy.body.refreshtoken).toBe(guid);
        expect(response.refreshtoken).toBe(guid);
    });

    it('Should be successful update refresh token', async () => {
        const { sut, guidSpy, bdClietnSpy, tokenSpy } = makeSut();

        const oldRefreshToken = faker.string.uuid();
        const newRefreshToken = faker.string.uuid();
        const userId = faker.string.uuid();

        guidSpy.guid = newRefreshToken;

        await bdClietnSpy.createUser(createUser({ refreshtoken: oldRefreshToken, id: userId }));
        const response = await sut.updateRefreshTokenByEmail(oldRefreshToken);

        expect(bdClietnSpy.body.userId).toBe(userId);
        expect(bdClietnSpy.body.refreshtoken).toBe(newRefreshToken);
        expect(tokenSpy.token).toBe(`${userId}token`);
        expect(response.refreshtoken).toBe(newRefreshToken);
    });

    it('Should be error update refresh token without user', async () => {
        const { sut } = makeSut();

        const promise = sut.updateRefreshTokenByEmail(faker.string.uuid());

        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });
});
