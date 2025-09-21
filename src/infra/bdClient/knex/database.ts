import { knex as setupKnex } from 'knex';

export const config = {
    client: 'sqlite3',
    connection: {
        filename: './tmp/app.db'
    },
}
export const knex = setupKnex(config);