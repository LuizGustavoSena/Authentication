import { RefreshTokenUseCase } from "../../../data/use-cases/refresh-token";
import { makeBdClient } from "../database";
import { makeUuidGuid } from "../guid/uuid-guid-factory";
import { makeJsonWebToken } from "../token/json-web-token";

export const makeRefreshToken = (): RefreshTokenUseCase => new RefreshTokenUseCase(
    makeUuidGuid(),
    makeBdClient(),
    makeJsonWebToken()
);