import { RemoteAccount } from "../../../data/use-cases/remote-account";
import { CreateAccount, LoginAccount } from "../../../domain/use-cases";
import { makeBdPrimaClient } from "../bdClient/bd-prisma-client";
import { makeCryptoEncrypt } from "../encrypt/crypto-encrypt";
import { makeUuidGuid } from "../guid/uuid-guid-factory";
import { makeJsonWebToken } from "../token/json-web-token";
import { makeRefreshToken } from "./refresh-token";

export const makeRemoteAccount = (): CreateAccount & LoginAccount => new RemoteAccount(
    makeBdPrimaClient(),
    makeJsonWebToken(),
    makeCryptoEncrypt(),
    makeUuidGuid(),
    makeRefreshToken()
);