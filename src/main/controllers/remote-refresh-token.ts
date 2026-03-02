import { NextFunction, Request, Response } from "express";
import { RefreshToken } from "../../domain/use-cases/refresh-token";

export default class RefreshTokenController {
    constructor(
        private remoteValidation: RefreshToken
    ) { };

    refreshToken = async (req: Request, rep: Response, next: NextFunction) => {
        const { refreshtoken } = req.headers;

        try {
            const refreshToken = await this.remoteValidation.updateRefreshTokenByRefreshToken(refreshtoken as string);

            rep.statusCode = 201;
            rep.send(refreshToken);
        } catch (error: any) {
            return next(error);
        }
    }
}

