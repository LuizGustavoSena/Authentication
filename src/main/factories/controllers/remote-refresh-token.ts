import RefreshTokenController from "../../controllers/remote-refresh-token";
import { makeRefreshToken } from "../use-cases/refresh-token";

export const makeRemoteRefreshTokenControler = (): RefreshTokenController => new RefreshTokenController(
    makeRefreshToken()
);