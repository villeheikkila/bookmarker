exports.up = (knex: any) =>
    knex.schema.createTable('videos', (table: any) => {
        table.increments();
        table.string('title').notNullable();
        table.string('author');
        table.string('url').notNullable();
        table.string('comment');
        table.string('type');
        table.string('tags');
        table.string('related');
    });

exports.down = (knex: any) => knex.schema.dropTable('videos');
