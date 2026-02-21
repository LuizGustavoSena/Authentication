import { BdClient, RequestHaveUser, ResponseCreateUser } from "../../../data/protocols/bd";
import { DatabaseError } from "../../../domain/error/database-error";
import { PatchRefreshToken, User, UserResponse } from "../../../domain/models";
import { knex } from "./database";

export class KnexBdClient implements BdClient {
    repository = knex;

    constructor() { };

    createUser = async (params: User): Promise<ResponseCreateUser> => {
        try {
            delete params.id
            const response = await this.repository.insert(params, ['id', 'username', 'email']).into('users');

            return response[0];
        } catch (error: any) {
            throw new DatabaseError(error.routine);
        }
    }

    getUserByFilter = async (params: Partial<RequestHaveUser>): Promise<UserResponse> => {
        try {
            const response = await this.repository('users').where(params).select(['id', 'username', 'email', 'refreshtoken']);

            return response[0];
        } catch (error: any) {
            throw new DatabaseError(error.routine);
        }
    }

    patchRefreshToken = async (params: PatchRefreshToken): Promise<void> => {
        try {
            const { email, refreshtoken } = params;
            await this.repository('users').where({ email }).update({ refreshtoken });
        } catch (error: any) {
            throw new DatabaseError(error.routine);
        }
    }
}