require('dotenv/config');
import { RequestToken, ResponseToken, ResponseValidate, Token } from "../../../src/data/protocols/token";
export class TokenSpy implements Token {
    token: string;

    generate(params: RequestToken): ResponseToken {
        this.token = `${params.userId}token`;

        return {
            token: this.token
        }
    }

    validate(token: string): ResponseValidate {
        if (this.token !== `${token}token`)
            return null;

        const date = new Date().getTime();

        return {
            userId: this.token.replace('token', ''),
            issued: date,
            expires: date + Number(process.env.EXPIRES_TOKEN_MILLISECONDS)
        }
    };
}