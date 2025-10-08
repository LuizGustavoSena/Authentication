export enum RemoteAccountMessageRequired {
    USERNAME = 'O campo username deve ser preenchido',
    EMAIL = 'O campo email deve ser preenchido',
    PASSWORD = 'O campo password deve ser preenchido'
}

export const MIN_PASSWORD_WORDS = 8;

export interface RemoteAccountValidation {
    createAccount(data: object): void | Error;
    loginAccount(data: object): void | Error;
}