import { PrismaClient } from "@prisma/client";
import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../data/protocols/bd";
import { PatchRefreshToken, UserResponse } from "../../domain/models";
import { RequestCreateAccount } from "../../domain/use-cases";

export class BdPrismaClient implements BdClient {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(params: RequestCreateAccount): Promise<ResponseCreateUser> {
        const createUser = await this.prisma.users.create({
            data: params
        });

        delete createUser.password;

        return createUser;
    }

    async getUserByFilter(params: Partial<RequestHaveUser>): Promise<UserResponse> {
        const results = await this.prisma.users.findFirst({
            where: params
        });

        if (results && results.password)
            delete results.password;

        return results;
    }

    async patchRefreshToken(params: PatchRefreshToken): Promise<void> {
        await this.prisma.users.update({
            where: { id: params.userId },
            data: {
                refresh_token: params.refreshToken
            }
        });
    }
}