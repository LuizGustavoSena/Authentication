import { GetRefreshTokenResponse } from "../../domain/models";
import { RefreshToken } from "../../domain/use-cases/refresh-token";
import { BdClient } from "../protocols/bd";
import { GuidClient } from "../protocols/guid";

export class RefreshTokenUseCase implements RefreshToken {
    constructor(
        private guid: GuidClient,
        private bdClient: BdClient,

    ) { };

    async getRefreshTokenByUserId(userId: string): Promise<GetRefreshTokenResponse> {
        const refreshToken = this.guid.generate();

        await this.bdClient.patchRefreshToken({ userId, refreshToken });

        return {
            refreshToken
        }
    }

    async updateRefreshTokenByRefreshToken(refreshToken: string): Promise<GetRefreshTokenResponse> {
        throw new Error("Method not implemented.");
    }
}