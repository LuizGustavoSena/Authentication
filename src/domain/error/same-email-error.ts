export class SameEmailError extends Error {
    constructor() {
        super('Email já existente');
        this.name = 'SameEmailError';
    }
}