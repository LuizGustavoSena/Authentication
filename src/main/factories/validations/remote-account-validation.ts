import { RemoteAccountValidation } from "../../../domain/validations/remote-account-validation";
import RemoteAccountValidationZod from "../../../infra/zod/remote-account-validation-zod";

export const makeRemoteAccountValidation = (): RemoteAccountValidation => new RemoteAccountValidationZod();