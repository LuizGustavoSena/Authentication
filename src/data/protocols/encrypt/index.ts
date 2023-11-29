export interface Encrypt {
    encrypt(data: string): string;
    decrypt(data: string): string;
}