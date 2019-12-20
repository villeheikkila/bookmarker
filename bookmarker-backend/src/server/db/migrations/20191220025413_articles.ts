exports.up = (knex: any) =>
    knex.schema.createTable('articles', (table: any) => {
        table.increments();
        table.string('title').notNullable();
        table.string('author');
        table.string('publisher');
        table.date('localDate');
        table.integer('year');
        table.string('tags');
        table.string('related');
    });

exports.down = (knex: any) => knex.schema.dropTable('articles');
