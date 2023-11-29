import { Token } from "../../../data/protocols/token";
import { JsonWebToken } from "../../../infra/token/json-web-token";

export const makeJsonWebToken = (): Token => new JsonWebToken();