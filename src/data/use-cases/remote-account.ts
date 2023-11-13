import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { RequestLoginAccount, ResponseLoginAccount } from "../../domain/models";
import { CreateAccount, RequestCreateAccount } from "../../domain/use-cases";
import { LoginAccount } from "../../domain/use-cases/login-account";
import { BdClient } from "../protocols/bd";
import { Token } from "../protocols/token";

export class RemoteAccount implements CreateAccount, LoginAccount {
    constructor(
        private bdClient: BdClient,
        private token: Token
    ) { };

    async createAccount(params: RequestCreateAccount): Promise<void> {
        try {
            await this.bdClient.createUser({
                email: params.email,
                password: params.password,
                username: params.username
            });
        } catch (error) {
            throw new SameEmailError();
        }
    };

    async loginAccount(params: RequestLoginAccount): Promise<ResponseLoginAccount> {
        const haveUser = await this.bdClient.haveUser({
            email: params.email,
            password: params.password
        });

        if (!haveUser)
            throw new InvalidCredentialsError();

        return this.token.generate({
            email: params.email
        });
    };
}