import { z } from "zod";
import { MIN_PASSWORD_WORDS, RemoteAccountMessageRequired, RemoteAccountValidation } from "../../domain/validations/remote-account-validation";

export default class RemoteAccountValidationZod implements RemoteAccountValidation {
    username = z.string({
        required_error: RemoteAccountMessageRequired.USERNAME,
    });

    email = z.string({
        required_error: RemoteAccountMessageRequired.EMAIL
    }).email();

    password = z.string({
        required_error: RemoteAccountMessageRequired.PASSWORD
    }).min(MIN_PASSWORD_WORDS);

    createAccount(data: object): void | Error {
        throw new Error("Method not implemented.");
    }
    loginAccount(data: object): void | Error {
        throw new Error("Method not implemented.");
    }
}