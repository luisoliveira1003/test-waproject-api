import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Wish', table => {
    table.increments('id').primary();
    table.string('description', 150).notNullable();
    table.integer('amount').notNullable();
    table.decimal('price').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Wish');
}
