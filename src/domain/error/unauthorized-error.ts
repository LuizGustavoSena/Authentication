import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
    constructor() {
        super('Credenciais inválidas', 401, 'UNAUTHORIZED');
        this.name = 'UnauthorizedError';
    }
}