import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { makeRemoteValidateToken } from "../factories/use-cases/remote-validate-token";

const validate = makeRemoteValidateToken();

export const validateToken = async (req: FastifyRequest, rep: FastifyReply) => {
    const { authorization } = req.headers;

    try {
        const token = await validate.validate(authorization.replace('Bearer ', ''));

        rep.statusCode = 200;
        rep.send(token);
    } catch (error: any) {
        rep.statusCode = error instanceof InvalidCredentialsError ?
            401 : 500;

        const msg = error instanceof InvalidCredentialsError ?
            error.message : 'Erro inesperado';

        rep.send(msg);
    }
}