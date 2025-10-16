import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { ValidateToken } from "../../domain/use-cases";
import { RemoteValidateTokenValidation } from "../../domain/validations/remote-validate-token-validation";

export default class ValidateTokenController {
    constructor(
        private validation: RemoteValidateTokenValidation,
        private remoteValidation: ValidateToken
    ) { };

    async validateToken(req: FastifyRequest, rep: FastifyReply) {
        const { authorization } = req.headers;

        try {
            this.validation.validateToken(authorization);

            const token = this.remoteValidation.validate(authorization.replace('Bearer ', ''));

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
}

