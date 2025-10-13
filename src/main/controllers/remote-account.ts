import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { RequestLoginAccount } from "../../domain/models";
import { CreateAccount, LoginAccount, RequestCreateAccount } from "../../domain/use-cases";
import { RemoteAccountValidation } from "../../domain/validations/remote-account-validation";

export default class RemoteAccountController {
    constructor(
        private validation: RemoteAccountValidation,
        private remoteAccount: CreateAccount & LoginAccount,
    ) { };

    async createAccount(req: FastifyRequest, rep: FastifyReply) {
        try {
            this.validation.createAccount(req.body);

            const response = await this.remoteAccount.createAccount(req.body as RequestCreateAccount);

            rep.statusCode = 201;
            rep.send(response);
        } catch (error: any) {
            let code = 500;
            let message = 'Erro inesperado';

            if (error instanceof SameEmailError || error instanceof ZodError) {
                code = error instanceof ZodError ? 415 : 400;
                message = error.message;
            };

            if (!(error instanceof SameEmailError) && !(error instanceof ZodError))
                req.log.info(error.message);

            rep.statusCode = code;
            rep.send(message);
        }
    }

    async loginAccount(req: FastifyRequest, rep: FastifyReply) {
        try {
            this.validation.loginAccount(req.body);

            const token = await this.remoteAccount.loginAccount(req.body as RequestLoginAccount);

            rep.statusCode = 201;
            rep.send(token);
        } catch (error: any) {
            let code = 500;
            let message = 'Erro inesperado';

            if (error instanceof InvalidCredentialsError || error instanceof ZodError) {
                code = error instanceof ZodError ? 415 : 400;
                message = error.message;
            };

            if (!(error instanceof InvalidCredentialsError) && !(error instanceof ZodError))
                req.log.info(error.message);

            rep.statusCode = code;
            rep.send(message);
        }
    }
}