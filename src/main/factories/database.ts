import { BdClient } from "../../data/protocols/bd";
import { KnexBdClient } from "../../infra/bdClient/knex/knex-bd-client";

export const makeBdClient = (): BdClient => new KnexBdClient();