exports.up = (knex: any) =>
    knex.schema.createTable('books', (table: any) => {
        table.increments();
        table.string('author').notNullable();
        table.string('title').notNullable();
        table.integer('year');
        table.integer('isbn');
        table.integer('edition');
        table.string('tags');
        table.string('related');
        table.string('type');
    });

exports.down = (knex: any) => knex.schema.dropTable('books');
