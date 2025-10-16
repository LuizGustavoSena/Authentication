import { z, ZodError } from "zod";
import { ValidationError } from "../../domain/error/validation-error";
import { RemoteValidateTokenValidation } from "../../domain/validations/remote-validate-token-validation";

export default class RemoteValidateTokenValidationZod implements RemoteValidateTokenValidation {
    token = z.string();

    validateToken(data: any): void | Error {
        this.throwValidationError(() => this.token.parse(data));
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