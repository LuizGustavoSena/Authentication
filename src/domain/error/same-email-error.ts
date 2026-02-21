import { AppError } from "./app-error";

export class SameEmailError extends AppError {
    constructor() {
        super(
            'Email já cadastrado',
            409,
            'EMAIL_ALREADY_IN_USE'
        );

        this.name = 'SameEmailError';
    }
}