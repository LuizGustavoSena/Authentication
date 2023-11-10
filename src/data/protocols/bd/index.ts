import { User } from "../../../domain/models";

export interface BdClient {
    createUser(params: User): Promise<void>;
    haveUser(params: RequestHaveUser): Promise<boolean>
};

export type RequestHaveUser = {
    email: string;
    password?: string;
}