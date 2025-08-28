import { GetRefreshTokenResponse } from "../models";

export interface RefreshToken {
    getRefreshTokenByUserId(userId: string): Promise<GetRefreshTokenResponse>;
    updateRefreshTokenByRefreshToken(refreshToken: string): Promise<GetRefreshTokenResponse>;
}