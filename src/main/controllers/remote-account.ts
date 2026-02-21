import { NextFunction, Request, Response } from "express";
import { RequestLoginAccount } from "../../domain/models";
import { CreateAccount, LoginAccount, RequestCreateAccount } from "../../domain/use-cases";
import { RemoteAccountValidation } from "../../domain/validations/remote-account-validation";

export default class RemoteAccountController {
    constructor(
        private validation: RemoteAccountValidation,
        private remoteAccount: CreateAccount & LoginAccount,
    ) { };

    createAccount = async (req: Request, rep: Response, next: NextFunction) => {
        try {
            this.validation.createAccount(req.body);

            const response = await this.remoteAccount.createAccount(req.body as RequestCreateAccount);

            rep.statusCode = 201;
            rep.send(response);
        } catch (error: any) {
            return next(error);
        }
    }

    loginAccount = async (req: any, rep: any, next: NextFunction) => {
        try {
            this.validation.loginAccount(req.body);

            const token = await this.remoteAccount.loginAccount(req.body as RequestLoginAccount);

            rep.statusCode = 201;
            rep.send(token);
        } catch (error: any) {
            return next(error);
        }
    }
}