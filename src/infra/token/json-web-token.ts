require('dotenv/config');
import { decode, encode } from "jwt-simple";
import { RequestToken, ResponseToken, ResponseValidate, Token } from "../../data/protocols/token";
import { env } from "../zod/env";

export class JsonWebToken implements Token {
    expirationInMilliseconds = Number(env.EXPIRES_TOKEN_MILLISECONDS);
    secretKey = String(env.SECRET_KEY_TOKEN);

    generate(params: RequestToken): ResponseToken {
        const issued = Date.now();

        const token = encode(
            {
                ...params,
                issued: issued,
                expires: issued + this.expirationInMilliseconds
            },
            this.secretKey,
            "HS512"
        );

        return { token };
    }

    validate(token: string): ResponseValidate {
        try {
            const result = decode(token, this.secretKey, false, 'HS512');

            if (!result || result.expires < new Date())
                return null;

            return result
        } catch (error) {
            return null;
        }
    }
}