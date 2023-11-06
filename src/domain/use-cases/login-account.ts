export interface LoginAccount {
    loginAccount(params: RequestLoginAccount): Promise<ResponseLoginAccount>;
}

export type RequestLoginAccount = {
    email: string;
    password: string;
}

export type ResponseLoginAccount = {
    token: string;
}
