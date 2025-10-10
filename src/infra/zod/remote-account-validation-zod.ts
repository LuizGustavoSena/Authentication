import { z, ZodError } from "zod";
import { ValidationError } from "../../domain/error/validation-error";
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
        const schema = z.object({
            username: this.username,
            email: this.email,
            password: this.password
        });

        this.throwValidationError(() => schema.parse(data));
    }

    loginAccount(data: object): void | Error {
        throw new Error("Method not implemented.");
    }

    private throwValidationError(callback: Function) {
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '));
        }
    }
}