import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { RequestLoginAccount, ResponseLoginAccount } from "../../domain/models";
import { CreateAccount, LoginAccount, RequestCreateAccount, ResponseCreateAccount } from "../../domain/use-cases";
import { BdClient } from "../protocols/bd";
import { Encrypt } from "../protocols/encrypt";
import { GuidClient } from "../protocols/guid";
import { Token } from "../protocols/token";

export class RemoteAccount implements CreateAccount, LoginAccount {
    constructor(
        private bdClient: BdClient,
        private token: Token,
        private crypt: Encrypt,
        private guid: GuidClient
    ) { };

    async createAccount(params: RequestCreateAccount): Promise<ResponseCreateAccount> {
        const { email } = params;

        const haveEmail = await this.bdClient.getUserByFilter({ email });

        if (haveEmail)
            throw new SameEmailError();

        const user = await this.bdClient.createUser({
            id: this.guid.generate(),
            email,
            password: this.crypt.encrypt(params.password),
            username: params.username
        });

        return user;
    };

    async loginAccount(params: RequestLoginAccount): Promise<ResponseLoginAccount> {
        const haveUser = await this.bdClient.getUserByFilter({
            email: params.email,
            password: this.crypt.encrypt(params.password)
        });

        if (!haveUser)
            throw new InvalidCredentialsError();

        const refreshToken = this.guid.generate();

        await this.bdClient.patchRefreshToken({ id: haveUser.id, refreshToken });

        const { token } = this.token.generate({
            userId: haveUser.id
        });

        return {
            token,
            refreshToken
        }
    };
}