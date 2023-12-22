import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { makeRemoteValidateToken } from "../factories/use-cases/remote-validate-token";

const validate = makeRemoteValidateToken();

const validationValidateToken = z.string();

export const validateToken = async (req: FastifyRequest, rep: FastifyReply) => {
    const { authorization } = req.headers;

    try {
        validationValidateToken.parse(authorization);

        const token = await validate.validate(authorization.replace('Bearer ', ''));

        rep.statusCode = 200;
        rep.send(token);
    } catch (error: any) {
        let code = 500;
        let message = 'Erro inesperado';

        if (error instanceof InvalidCredentialsError || error instanceof ZodError) {
            code = error instanceof ZodError ? 415 : 401;
            message = error.message;
        };

        if (!(error instanceof InvalidCredentialsError) && !(error instanceof ZodError))
            req.log.info(error.message);

        rep.statusCode = code;
        rep.send(message);
    }
}