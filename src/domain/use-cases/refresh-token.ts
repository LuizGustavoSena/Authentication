import { GetRefreshTokenResponse, UpdateRefreshTokenResponse } from "../models";

export interface RefreshToken {
    getRefreshTokenByUserId(userId: string): Promise<GetRefreshTokenResponse>;
    updateRefreshTokenByRefreshToken(refresh_token: string): Promise<UpdateRefreshTokenResponse>;
}