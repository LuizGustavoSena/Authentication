import { GetRefreshTokenResponse, UpdateRefreshTokenResponse } from "../models";

export interface RefreshToken {
    getRefreshTokenByEmail(email: string): Promise<GetRefreshTokenResponse>;
    updateRefreshTokenByEmail(email: string): Promise<UpdateRefreshTokenResponse>;
}