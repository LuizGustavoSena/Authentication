import { PrismaClient } from "@prisma/client";
import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../data/protocols/bd";
import { PatchRefreshToken, User, UserResponse } from "../../domain/models";

export class BdPrismaClient implements BdClient {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(params: User): Promise<ResponseCreateUser> {
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

    async patchRefreshTokenById(params: PatchRefreshToken): Promise<void> {

    }
}