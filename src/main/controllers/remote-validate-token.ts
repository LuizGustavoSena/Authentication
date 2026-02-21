import { NextFunction, Request, Response } from "express";
import { ValidateToken } from "../../domain/use-cases";
import { RemoteValidateTokenValidation } from "../../domain/validations/remote-validate-token-validation";

export default class ValidateTokenController {
    constructor(
        private validation: RemoteValidateTokenValidation,
        private remoteValidation: ValidateToken
    ) { };

    validateToken = async (req: Request, rep: Response, next: NextFunction) => {
        const { authorization } = req.headers;

        try {
            this.validation.validateToken(authorization);

            const token = this.remoteValidation.validate(authorization.replace('Bearer ', ''));

            rep.statusCode = 200;
            rep.send(token);
        } catch (error: any) {
            return next(error);
        }
    }
}

