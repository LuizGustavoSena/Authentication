import { PatchRefreshToken, User, UserResponse } from "../../../domain/models";

export interface BdClient {
    createUser(params: User): Promise<ResponseCreateUser>;
    getUserByFilter(params: Partial<RequestHaveUser>): Promise<UserResponse>;
    patchRefreshTokenById(params: PatchRefreshToken): Promise<void>;
};

export type RequestHaveUser = {
    email: string;
    password?: string;
    userId: string;
}

export type ResponseCreateUser = {
    id: string;
    username: string;
    email: string;
}