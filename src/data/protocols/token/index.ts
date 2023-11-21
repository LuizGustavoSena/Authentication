export interface Token {
    generate(params: RequestToken): ResponseToken;
    validate(token: string): boolean;
}

export type RequestToken = {
    email: string;
}

export type ResponseToken = {
    token: string;
}