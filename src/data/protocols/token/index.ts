export interface Token {
    generate(params: RequestToken): ResponseToken;
    validate(token: string): ResponseValidate;
}

export type RequestToken = {
    userId: string;
}

export type ResponseToken = {
    token: string;
}

export type ResponseValidate = {
    userId: string;
    issued: number;
    expires: number;
}