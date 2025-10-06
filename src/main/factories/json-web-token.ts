import { Token } from "../../data/protocols/token";
import { JsonWebToken } from "../../infra/token/json-web-token";

export const makeToken = (): Token => new JsonWebToken();