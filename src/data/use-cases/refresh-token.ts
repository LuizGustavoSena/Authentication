import { InvalidCredentialsError } from "../../domain/error/invalid-credentials-error";
import { GetRefreshTokenResponse, UpdateRefreshTokenResponse } from "../../domain/models";
import { RefreshToken } from "../../domain/use-cases/refresh-token";
import { BdClient } from "../protocols/bd";
import { GuidClient } from "../protocols/guid";
import { Token } from "../protocols/token";

export class RefreshTokenUseCase implements RefreshToken {
    constructor(
        private guid: GuidClient,
        private bdClient: BdClient,
        private token: Token,
    ) { };

    async getRefreshTokenByUserId(userId: string): Promise<GetRefreshTokenResponse> {
        const refreshToken = this.guid.generate();

        await this.bdClient.patchRefreshToken({ userId, refreshToken });

        return {
            refreshToken
        }
    }

    async updateRefreshTokenByRefreshToken(refresh_token: string): Promise<UpdateRefreshTokenResponse> {
        const user = await this.bdClient.getUserByFilter({ refresh_token });

        if (!user)
            throw new InvalidCredentialsError();

        const { refreshToken } = await this.getRefreshTokenByUserId(user.id);

        const { token } = this.token.generate({
            userId: user.id
        });

        return {
            refreshToken,
            token
        };
    }
}