import ValidateTokenController from "../../controllers/remote-validate-token";
import { makeRemoteValidateToken } from "../use-cases/remote-validate-token";
import { makeRemoteValidateTokenValidation } from "../validations/remote-validate-token";

export const makeRemoteValidateTokenControler = () => new ValidateTokenController(
    makeRemoteValidateTokenValidation(),
    makeRemoteValidateToken()
);