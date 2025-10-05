import { RemoteAccount } from "../../../data/use-cases/remote-account";
import { CreateAccount, LoginAccount } from "../../../domain/use-cases";
import { makeBdClient } from "../database";
import { makeCryptoEncrypt } from "../encrypt/crypto-encrypt";
import { makeUuidGuid } from "../guid/uuid-guid-factory";
import { makeJsonWebToken } from "../token/json-web-token";
import { makeRefreshToken } from "./refresh-token";

export const makeRemoteAccount = (): CreateAccount & LoginAccount => new RemoteAccount(
    makeBdClient(),
    makeJsonWebToken(),
    makeCryptoEncrypt(),
    makeUuidGuid(),
    makeRefreshToken()
);