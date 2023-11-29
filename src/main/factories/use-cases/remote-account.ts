import { RemoteAccount } from "../../../data/use-cases/remote-account";
import { CreateAccount, LoginAccount } from "../../../domain/use-cases";
import { makeBdPrimaClient } from "../bdClient/bd-prisma-client";
import { makeJsonWebToken } from "../token/json-web-token";

export const makeRemoteAccount = (): CreateAccount & LoginAccount => new RemoteAccount(
    makeBdPrimaClient(),
    makeJsonWebToken()
);