import { RequestLoginAccount, ResponseLoginAccount } from "../models";

export interface LoginAccount {
    loginAccount(params: RequestLoginAccount): Promise<ResponseLoginAccount>;
}