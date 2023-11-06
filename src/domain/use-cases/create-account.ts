export interface CreateAccount {
    createAccount(params: RequestCreateAccount): Promise<void>;
}

export type RequestCreateAccount = {
    username: string;
    email: string;
    password: string;
}
