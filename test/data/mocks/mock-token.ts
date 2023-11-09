import { RequestToken, ResponseToken, Token } from "../../../src/data/protocols/token";

export class TokenSpy implements Token {
    token: string;

    generate(params: RequestToken): ResponseToken {
        this.token = `${params.email}token`;

        return {
            token: this.token
        }
    }
}