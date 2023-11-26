import { ResponseValidate } from "../../data/protocols/token";

export interface ValidateToken {
    validate(token: string): ResponseValidate;
}