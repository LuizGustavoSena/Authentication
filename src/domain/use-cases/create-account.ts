export interface CreateAccount {
    createAccount(params: RequestCreateAccount): Promise<ResponseCreateAccount>;
}

export type RequestCreateAccount = {
    username: string;
    email: string;
    password: string;
}

export type ResponseCreateAccount = {
    id: string;
    username: string;
    email: string;
}
