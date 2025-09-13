import { faker } from "@faker-js/faker";
import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../../src/data/protocols/bd";
import { InvalidCredentialsError } from "../../../src/domain/error/invalid-credentials-error";
import { PatchRefreshToken, User, UserResponse } from "../../../src/domain/models";

export class BdClientSpy implements BdClient {
    users: User[] = [];
    model: string;
    body: any;

    async createUser(params: User): Promise<ResponseCreateUser> {
        this.body = params;

        if (this.users.find(el => el.email === params.email))
            throw new Error();

        this.users.push(params);

        return {
            id: faker.word.words(),
            ...params
        }
    }

    async getUserByFilter(params: Partial<RequestHaveUser>): Promise<UserResponse> {
        this.body = params;

        if (this.users.length === 0)
            return null;

        const haveModel = this.users.find(user =>
            Object.entries(params).every(([key, value]) => user[key as keyof User] === value)
        );

        if (!haveModel)
            return null;

        return haveModel;
    }

    async patchRefreshToken(params: PatchRefreshToken): Promise<void> {
        this.body = params;

        if (this.users.length === 0)
            throw new InvalidCredentialsError();

        const user = await this.getUserByFilter({ userId: params.userId });

        user.refreshToken = params.refreshToken;
    }

}