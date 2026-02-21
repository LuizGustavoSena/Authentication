import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../../data/protocols/bd";
import { DatabaseError } from "../../../domain/error/same-email-error copy";
import { PatchRefreshToken, UserResponse } from "../../../domain/models";
import { RequestCreateAccount } from "../../../domain/use-cases";
import { knex } from "./database";

export class KnexBdClient implements BdClient {
    repository = knex;

    constructor() { };

    createUser = async (params: RequestCreateAccount): Promise<ResponseCreateUser> => {
        try {
            const response = await this.repository.insert(params, ['id', 'username', 'email']).into('users');

            return response[0];
        } catch (error) {
            console.error('[KNEX][createUser]', error);
            throw new DatabaseError();
        }
    }

    getUserByFilter = async (params: Partial<RequestHaveUser>): Promise<UserResponse> => {
        try {
            const response = await this.repository('users').where(params).select(['id', 'username', 'email', 'refreshtoken']);

            return response[0];
        } catch (error) {
            throw new DatabaseError();
        }
    }

    patchRefreshToken = async (params: PatchRefreshToken): Promise<void> => {
        try {
            const { userId, refreshtoken } = params;
            await this.repository('users').where({ id: userId }).update({ refreshtoken });
        } catch (error) {
            throw new DatabaseError();
        }
    }
}