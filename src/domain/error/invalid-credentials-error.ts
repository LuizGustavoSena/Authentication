export class InvalidCredentialsError extends Error {
    constructor() {
        super('ECredenciais inválidas');
        this.name = 'InvalidCredentialsError';
    }
}