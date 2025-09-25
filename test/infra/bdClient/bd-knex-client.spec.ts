import { describe, expect, it } from 'vitest';
import { KnexBdClient } from '../../../src/infra/bdClient/knex/knex-bd-client';
import { requestCreateAccount } from '../../domain/mocks/remote-account';

const makeSut = () => new KnexBdClient();

describe('BdKnexClient', () => {
    it('should be successful create a new user', async () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        const test = await sut.createUser(request);

        expect(test).not.toHaveProperty('password');
        expect(test.id).toBe(request.id);
        expect(test.email).toBe(request.email);
        expect(test.username).toBe(request.username);
    });
});