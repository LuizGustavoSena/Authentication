import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.uuid('refresh_token');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

