import { RequestToken, ResponseToken, Token } from "../../data/protocols/token";
const jwt = require('jsonwebtoken');

export class JsonWebToken implements Token {
    token;

    constructor() {
        this.token = jwt
    };

    generate(params: RequestToken): ResponseToken {
        const token = this.token.sing(
            { user: params.email },
            process.env.SECRETKEY,
            { expiresIn: process.env.EXPIRESTOKENMILLISECONDS }
        );

        return { token };
    }

    validate(token: string): boolean {
        try {
            const user = this.token.verify(
                token,
                process.env.SECRETKEY
            );

            return !!user;
        } catch (error) {
            return false;
        }
    }
}