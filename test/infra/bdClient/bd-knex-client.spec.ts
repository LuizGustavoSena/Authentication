import { describe, expect, it } from 'vitest';
import { knex } from '../../../src/infra/bdClient/knex/database';

describe('BdKnexClient', () => {
    it('should be', async () => {
        const test = await knex('sqlite_schema').select('*');

        expect(test).toHaveLength(0);
    });
})