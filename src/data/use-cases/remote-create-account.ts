import { CreateAccount, RequestCreateAccount, ResponseCreateAccount } from "../../domain/use-cases";
import { BdClient } from "../protocols/bd";

export class RemoteCreateAccount implements CreateAccount {
    constructor(
        private bdCLient: BdClient
    ) { };

    createAccount(params: RequestCreateAccount): Promise<ResponseCreateAccount> {

        throw new Error("Method not implemented.");
    };

}