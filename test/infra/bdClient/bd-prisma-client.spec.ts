import { faker } from "@faker-js/faker";
import { describe, it, vi } from "vitest";
import { User } from "../../../src/domain/models";
import { BbPrismaClient } from "../../../src/infra/bdClient/bd-prisma-client";

vi.mock('../helpers/prisma.ts');

type Props = {
    sut: BbPrismaClient
};

const makeSut = (): Props => {
    const sut = new BbPrismaClient();

    return {
        sut
    }
};

describe('BbPrismaClient', () => {
    it('Should correct create user', async () => {
        const { sut } = makeSut();

        const request: User = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.person.firstName()
        };

        const user = await sut.createUser(request);

        console.log({ user });
    });
});