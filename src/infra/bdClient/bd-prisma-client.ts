import { PrismaClient } from "@prisma/client";
import { BdClient, RequestHaveUser } from "../../data/protocols/bd";
import { User } from "../../domain/models";

export class BbPrismaClient implements BdClient {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(params: User): Promise<void> {
        const { email, password, username } = params;

        await this.prisma.users.create({
            data: {
                email,
                password,
                username
            }
        });
    }

    async haveUser(params: RequestHaveUser): Promise<boolean> {
        const { email, password } = params;

        const results = await this.prisma.users.findFirst({
            where: {
                email,
                password
            }
        });

        return !!results;
    }
}