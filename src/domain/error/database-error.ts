import { AppError, ErrorDetails } from "./app-error";

export class DatabaseError extends AppError {
    constructor(details?: ErrorDetails) {
        super('Erro no banco de dados', 500, 'DATABASE_ERROR', details);
        this.name = 'DatabaseError';
    }
}