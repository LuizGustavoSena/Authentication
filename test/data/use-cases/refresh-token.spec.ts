import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { RefreshTokenUseCase } from "../../../src/data/use-cases/refresh-token";
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

        const response = await sut.getRefreshTokenByUserId(userId);

        expect(bdClietnSpy.body.userId).toBe(userId);
        expect(bdClietnSpy.body.refreshToken).toBe(guid);
        expect(response.refreshToken).toBe(guid);
    });

    it('Should be successful update refresh token', async () => {
        const { sut, guidSpy, bdClietnSpy, tokenSpy } = makeSut();

        const oldRefreshToken = faker.string.uuid();
        const newRefreshToken = faker.string.uuid();
        const userId = faker.string.uuid();

        guidSpy.guid = newRefreshToken;

        await bdClietnSpy.createUser(createUser({ refreshToken: oldRefreshToken, id: userId }));
        const response = await sut.updateRefreshTokenByRefreshToken(oldRefreshToken);

        expect(bdClietnSpy.body.userId).toBe(userId);
        expect(bdClietnSpy.body.refreshToken).toBe(newRefreshToken);
        expect(tokenSpy.token).toBe(`${userId}token`);
        expect(response.refreshToken).toBe(newRefreshToken);
    });
});
