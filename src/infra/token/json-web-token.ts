require('dotenv/config');
import { decode, encode } from "jwt-simple";
import { RequestToken, ResponseToken, ResponseValidate, Token } from "../../data/protocols/token";

export class JsonWebToken implements Token {

    generate(params: RequestToken): ResponseToken {
        const issued = Date.now();

        const token = encode(
            {
                ...params,
                issued: issued,
                expires: issued + Number(process.env.EXPIRESTOKENMILLISECONDS)
            },
            String(process.env.SECRETKEY),
            "HS512"
        );

        return { token };
    }

    validate(token: string): ResponseValidate {
        const result = decode(token, String(process.env.SECRETKEY), false, 'HS512');

        if (!result || result.expires < new Date())
            return null;

        return result
    }
}