import { User } from "../../domain/models";
import { CreateAccount, RequestCreateAccount } from "../../domain/use-cases";
import { BdClient } from "../protocols/bd";

export class RemoteCreateAccount implements CreateAccount {
    constructor(
        private bdCLient: BdClient
    ) { };

    async createAccount(params: RequestCreateAccount): Promise<void> {
        const haveUser = await this.bdCLient.getModel<object, string>({
            model: 'User',
            body: {
                email: params.email
            }
        });

        if (haveUser)
            throw new Error("Existing email");

        await this.bdCLient.createModel<User>({
            model: 'User',
            body: {
                email: params.email,
                password: params.password,
                username: params.username
            }
        });
    };
}