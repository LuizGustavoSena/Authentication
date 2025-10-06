import { RefreshTokenUseCase } from "../../../data/use-cases/refresh-token";
import { makeBdClient } from "../database";
import { makeGuid } from "../guid";
import { makeToken } from "../json-web-token";

export const makeRefreshToken = (): RefreshTokenUseCase => new RefreshTokenUseCase(
    makeGuid(),
    makeBdClient(),
    makeToken()
);