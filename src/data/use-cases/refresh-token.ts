import { UnauthorizedError } from "../../domain/error/unauthorized-error";
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

    async getRefreshTokenByEmail(email: string): Promise<GetRefreshTokenResponse> {
        const refreshtoken = this.guid.generate();

        await this.bdClient.patchRefreshToken({ email, refreshtoken });

        return {
            refreshtoken
        }
    }

    async updateRefreshTokenByEmail(email: string): Promise<UpdateRefreshTokenResponse> {
        const user = await this.bdClient.getUserByFilter({ email });

        if (!user)
            throw new UnauthorizedError();

        const { refreshtoken } = await this.getRefreshTokenByEmail(user.email);

        const { token } = this.token.generate({
            email: user.email
        });

        return {
            refreshtoken,
            token
        };
    }
}