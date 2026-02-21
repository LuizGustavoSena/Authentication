import { PatchRefreshToken, User, UserResponse } from "../../../domain/models";

export interface BdClient {
    createUser(params: User): Promise<ResponseCreateUser>;
    getUserByFilter(params: Partial<RequestHaveUser>): Promise<UserResponse>;
    patchRefreshToken(params: PatchRefreshToken): Promise<void>;
};

export type RequestHaveUser = {
    email: string;
    password?: string;
    id: string;
    refreshtoken?: string;
}

export type ResponseCreateUser = {
    id: string;
    username: string;
    email: string;
}