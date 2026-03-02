import { GetRefreshTokenResponse, UpdateRefreshTokenResponse } from "../models";

export interface RefreshToken {
    getRefreshTokenByEmail(email: string): Promise<GetRefreshTokenResponse>;
    updateRefreshTokenByRefreshToken(oldToken: string): Promise<UpdateRefreshTokenResponse>;
}