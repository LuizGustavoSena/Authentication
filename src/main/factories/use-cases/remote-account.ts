import { RemoteAccount } from "../../../data/use-cases/remote-account";
import { CreateAccount, LoginAccount } from "../../../domain/use-cases";
import { makeCrypto } from "../crypt";
import { makeBdClient } from "../database";
import { makeGuid } from "../guid";
import { makeToken } from "../json-web-token";
import { makeRefreshToken } from "./refresh-token";

export const makeRemoteAccount = (): CreateAccount & LoginAccount => new RemoteAccount(
    makeBdClient(),
    makeToken(),
    makeCrypto(),
    makeGuid(),
    makeRefreshToken()
);