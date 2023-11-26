import { BdClient } from "../../../data/protocols/bd";
import { BdPrismaClient } from "../../../infra/bdClient/bdPrismaClient";

export const makeBdPrimaClient = (): BdClient => new BdPrismaClient();