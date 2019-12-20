exports.up = (knex: any) =>
    knex.schema.createTable('blogposts', (table: any) => {
        table.increments();
        table.string('title').notNullable();
        table.string('author');
        table.string('url').notNullable();
        table.string('tags');
        table.string('related');
        table.string('type');
    });

exports.down = (knex: any) => knex.schema.dropTable('blogposts');
