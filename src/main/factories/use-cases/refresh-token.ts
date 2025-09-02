import { RefreshTokenUseCase } from "../../../data/use-cases/refresh-token";
import { makeBdPrimaClient } from "../bdClient/bd-prisma-client";
import { makeUuidGuid } from "../guid/uuid-guid-factory";
import { makeJsonWebToken } from "../token/json-web-token";

export const makeRefreshToken = (): RefreshTokenUseCase => new RefreshTokenUseCase(
    makeUuidGuid(),
    makeBdPrimaClient(),
    makeJsonWebToken()
);