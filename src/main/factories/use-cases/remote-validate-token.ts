import { RemoteValidateToken } from "../../../data/use-cases/remote-validate-token";
import { ValidateToken } from "../../../domain/use-cases";
import { makeJsonWebToken } from "../token/json-web-token";

export const makeRemoteValidateToken = (): ValidateToken => new RemoteValidateToken(
    makeJsonWebToken()
)