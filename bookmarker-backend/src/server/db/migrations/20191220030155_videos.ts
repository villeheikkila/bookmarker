exports.up = (knex: any) =>
    knex.schema.createTable('videos', (table: any) => {
        table.increments();
        table.string('title').notNullable();
        table.integer('url').notNullable();
        table.string('author');
        table.string('comment');
        table.string('related');
    });

exports.down = (knex: any) => knex.schema.dropTable('videos');
