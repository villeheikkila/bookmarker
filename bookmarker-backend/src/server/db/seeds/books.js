exports.seed = (knex, Promise) => {
    return knex('books')
        .then(() => {
            return knex('books').insert([
                { author: 'rowValue1222', title: 'moi', year: 1992, tags: 'heeii', related: 'hoii' },
            ]);
        })
        .then(function() {
            // Inserts seed entries
            return knex('books').insert([
                { author: 'rowValue122dsadasd2', title: 'moi', year: 1992, tags: 'heeii', related: 'hoii' },
            ]);
        });
};
