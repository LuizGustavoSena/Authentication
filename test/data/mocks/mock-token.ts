require('dotenv/config');
import { RequestToken, ResponseToken, ResponseValidate, Token } from "../../../src/data/protocols/token";
import { env } from "../../../src/infra/zod/env";
export class TokenSpy implements Token {
    token: string;

    generate(params: RequestToken): ResponseToken {
        this.token = `${params.email}token`;

        return {
            token: this.token
        }
    }

    validate(token: string): ResponseValidate {
        if (this.token !== `${token}token`)
            return null;

        const date = new Date().getTime();

        return {
            email: this.token.replace('token', ''),
            issued: date,
            expires: date + Number(env.EXPIRES_TOKEN_MILLISECONDS)
        }
    };
}