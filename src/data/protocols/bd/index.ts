import { PatchRefreshToken, UserResponse } from "../../../domain/models";
import { RequestCreateAccount } from "../../../domain/use-cases";

export interface BdClient {
    createUser(params: RequestCreateAccount): Promise<ResponseCreateUser>;
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