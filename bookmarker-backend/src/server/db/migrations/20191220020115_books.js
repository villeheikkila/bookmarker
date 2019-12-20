exports.up = function(knex) {
    return knex.schema.createTable('books', table => {
        table.increments();
        table.string('author').notNullable();
        table.string('title').notNullable();
        table.integer('year').notNullable();
        table.string('tags').notNullable();
        table.string('related').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
