export type RequestLoginAccount = {
    email: string;
    password: string;
}

export type ResponseLoginAccount = {
    token: string;
    refreshtoken: string;
}
