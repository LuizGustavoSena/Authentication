import { RemoteValidateTokenValidation } from "../../../domain/validations/remote-validate-token-validation";
import RemoteValidateTokenValidationZod from "../../../infra/zod/remote-validate-token-validation-zod";

export const makeRemoteValidateTokenValidation = (): RemoteValidateTokenValidation => new RemoteValidateTokenValidationZod();