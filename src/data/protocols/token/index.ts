export interface Token {
    generate(params: RequestToken): ResponseToken
}

export type RequestToken = {
    email: string;
}

export type ResponseToken = {
    token: string;
}