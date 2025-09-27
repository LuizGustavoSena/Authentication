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

    it('should be successful get user by email and password', async () => {
        const sut = makeSut();

        const request = requestCreateAccount();

        await sut.createUser(request);

        const response = await sut.getUserByFilter({
            email: request.email,
            password: request.password
        });

        expect(response).not.toHaveProperty('password');
        expect(response.id).toBe(request.id);
        expect(response.email).toBe(request.email);
        expect(response.username).toBe(request.username);
    });
});