import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { RequestLoginAccount } from "../../domain/models";
import { RequestCreateAccount } from "../../domain/use-cases";
import { makeRemoteAccount } from "../factories/use-cases/remote-account";

const remoteAccount = makeRemoteAccount();

const minWordsPassword = 8;

const validateCreateAccount = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(minWordsPassword)
});

const validateLoginAccount = z.object({
    email: z.string().email(),
    password: z.string().min(minWordsPassword)
});

export const createAccount = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        validateCreateAccount.parse(req.body);

        const response = await remoteAccount.createAccount(req.body as RequestCreateAccount);

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

export const loginAccount = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        validateLoginAccount.parse(req.body);

        const token = await remoteAccount.loginAccount(req.body as RequestLoginAccount);

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