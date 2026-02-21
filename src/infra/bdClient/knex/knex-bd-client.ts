import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../../data/protocols/bd";
import { DatabaseError } from "../../../domain/error/same-email-error copy";
import { PatchRefreshToken, User, UserResponse } from "../../../domain/models";
import { knex } from "./database";

export class KnexBdClient implements BdClient {
    repository = knex;

    constructor() { };

    createUser = async (params: User): Promise<ResponseCreateUser> => {
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
            console.error('[KNEX][getUserByFilter]', error);
            throw new DatabaseError();
        }
    }

    patchRefreshToken = async (params: PatchRefreshToken): Promise<void> => {
        try {
            const { email, refreshtoken } = params;
            await this.repository('users').where({ email }).update({ refreshtoken });
        } catch (error) {
            console.error('[KNEX][patchRefreshToken]', error);
            throw new DatabaseError();
        }
    }
}