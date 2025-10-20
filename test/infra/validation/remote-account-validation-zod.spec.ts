import { describe } from 'vitest';
import RemoteAccountValidationZod from "../../../src/infra/zod/remote-account-validation-zod";

export const makeSut = (): RemoteAccountValidationZod =>
    new RemoteAccountValidationZod();

describe('RemoteAccountValidationZod', () => {

});