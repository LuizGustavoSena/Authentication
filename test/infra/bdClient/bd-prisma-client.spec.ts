import { faker } from "@faker-js/faker";
import { describe, expect, it, vi } from "vitest";
import { BdPrismaClient } from "../../../src/infra/bdClient/bd-prisma-client";
import { requestCreateAccount } from "../../domain/mocks/remote-account";

vi.mock('../helpers/prisma.ts');

type Props = {
    sut: BdPrismaClient
};

const makeSut = (): Props => {
    const sut = new BdPrismaClient();

    return {
        sut
    }
};

describe('BbPrismaClient', () => {
    it('Should create user', async () => {
        const { sut } = makeSut();

        const request = requestCreateAccount();

        const user = await sut.createUser(request);

        const haveUser = await sut.getUserByFilter({
            email: request.email,
            password: request.password
        });

        expect(user.id).not.null.undefined;
        expect(haveUser).true;
    });

    it('Should existing user by email', async () => {
        const { sut } = makeSut();

        const request = requestCreateAccount();

        const response = await sut.createUser(request);

        const haveUser = await sut.getUserByFilter({ email: request.email });

        expect(response.id).not.null.undefined;
        expect(haveUser).true;
    });

    it('Should nonexisting user by email', async () => {
        const { sut } = makeSut();

        const haveUser = await sut.getUserByFilter({ email: faker.internet.email() });

        expect(haveUser).false;
    });

    it('Should nonexisting user by email and password', async () => {
        const { sut } = makeSut();

        const haveUser = await sut.getUserByFilter({
            email: faker.internet.email(),
            password: faker.word.words()
        });

        expect(haveUser).false;
    });
});