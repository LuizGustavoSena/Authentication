export class DatabaseError extends Error {
    constructor() {
        super('Erro no banco de dados');
        this.name = 'DatabaseError';
    }
}