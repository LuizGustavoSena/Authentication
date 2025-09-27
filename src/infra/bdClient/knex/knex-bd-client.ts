import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../../data/protocols/bd";
import { DatabaseError } from "../../../domain/error/same-email-error copy";
import { PatchRefreshToken, UserResponse } from "../../../domain/models";
import { RequestCreateAccount } from "../../../domain/use-cases";
import { knex } from "./database";

export class KnexBdClient implements BdClient {
    repository = knex;

    constructor() { };

    async createUser(params: RequestCreateAccount): Promise<ResponseCreateUser> {
        try {
            const response = await this.repository.insert(params, ['id', 'username', 'email']).into('users');

            return response[0];
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async getUserByFilter(params: Partial<RequestHaveUser>): Promise<UserResponse> {
        try {
            const response = await this.repository('users').where(params).select(['id', 'username', 'email', 'refresh_token']);

            return response[0];
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async patchRefreshToken(params: PatchRefreshToken): Promise<void> {
        throw new Error("Method not implemented.");
    }
}