import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { SameEmailError } from "../../domain/error/same-email-error";
import { RequestLoginAccount } from "../../domain/models";
import { RequestCreateAccount } from "../../domain/use-cases";
import { makeRemoteAccount } from "../factories/use-cases/remote-account";

const remoteAccount = makeRemoteAccount();

export const createAccount = async (req: FastifyRequest, rep: FastifyReply) => {
    const { username, email, password } = req.body as RequestCreateAccount;

    try {
        await remoteAccount.createAccount({
            username,
            email,
            password
        });

        rep.statusCode = 201;
        rep.send();
    } catch (error: any) {
        rep.statusCode = error instanceof SameEmailError ?
            400 : 500;

        const msg = error instanceof SameEmailError ?
            error.message : 'Erro inesperado';

        rep.send(msg);
    }
}

export const loginAccount = async (req: FastifyRequest, rep: FastifyReply) => {
    const { email, password } = req.body as RequestLoginAccount;

    try {
        const token = await remoteAccount.loginAccount({
            email,
            password
        });

        rep.statusCode = 201;
        rep.send(token);
    } catch (error: any) {
        rep.statusCode = error instanceof InvalidCredentialsError ?
            401 : 500;

        const msg = error instanceof InvalidCredentialsError ?
            error.message : 'Erro inesperado';

        rep.send(msg);
    }
}