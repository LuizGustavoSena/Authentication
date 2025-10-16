import RemoteAccountController from "../../controllers/remote-account";
import { makeRemoteAccount } from "../use-cases/remote-account";
import { makeRemoteAccountValidation } from "../validations/remote-account-validation";

export const makeRemoteAccountController = (): RemoteAccountController =>
    new RemoteAccountController(
        makeRemoteAccountValidation(),
        makeRemoteAccount()
    );