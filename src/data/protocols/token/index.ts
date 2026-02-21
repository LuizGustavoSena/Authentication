export interface Token {
    generate(params: RequestToken): ResponseToken;
    validate(token: string): ResponseValidate;
}

export type RequestToken = {
    email: string;
}

export type ResponseToken = {
    token: string;
}

export type ResponseValidate = {
    email: string;
    issued: number;
    expires: number;
}