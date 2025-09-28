import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { knex } from '../../../src/infra/bdClient/knex/database';
import { KnexBdClient } from '../../../src/infra/bdClient/knex/knex-bd-client';
import { requestCreateAccount } from '../../domain/mocks/remote-account';

const makeSut = () => new KnexBdClient();

describe('BdKnexClient', () => {
    beforeEach(async () => {
        await knex.migrate.rollback(undefined, true);
        await knex.migrate.latest();
    });

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

    it('should be successful update refresh token', async () => {
        const sut = makeSut();

        const request = requestCreateAccount();
        const refreshtoken = faker.string.uuid();

        await sut.createUser(request);

        await sut.patchRefreshToken({
            userId: request.id,
            refreshtoken
        });

        const response = await sut.getUserByFilter({ id: request.id });

        expect(response.refreshtoken).toBe(refreshtoken);
    });
});