import { RemoteValidateToken } from "../../../data/use-cases/remote-validate-token";
import { ValidateToken } from "../../../domain/use-cases";
import { makeToken } from "../json-web-token";

export const makeRemoteValidateToken = (): ValidateToken => new RemoteValidateToken(
    makeToken()
)