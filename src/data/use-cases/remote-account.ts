import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { User } from "../../domain/models";
import { CreateAccount, RequestCreateAccount } from "../../domain/use-cases";
import { LoginAccount, RequestLoginAccount, ResponseLoginAccount } from "../../domain/use-cases/login-account";
import { BdClient } from "../protocols/bd";
import { Token } from "../protocols/token";

export class RemoteAccount implements CreateAccount, LoginAccount {
    constructor(
        private bdClient: BdClient,
        private token: Token
    ) { };

    async createAccount(params: RequestCreateAccount): Promise<void> {
        const haveUser = await this.bdClient.getModel<object, string>({
            model: 'User',
            body: {
                email: params.email
            }
        });

        if (haveUser)
            throw new SameEmailError();

        await this.bdClient.createModel<User>({
            model: 'User',
            body: {
                email: params.email,
                password: params.password,
                username: params.username
            }
        });
    };

    async loginAccount(params: RequestLoginAccount): Promise<ResponseLoginAccount> {
        const haveUser = await this.bdClient.getModel<RequestLoginAccount, boolean>({
            model: 'User',
            body: {
                email: params.email,
                password: params.password
            }
        });

        if (!haveUser)
            throw new InvalidCredentialsError();

        return this.token.generate({
            email: params.email
        });
    };
}