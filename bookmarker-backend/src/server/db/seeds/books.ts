exports.seed = (knex: any, Promise: any) =>
    knex('books')
        .then(() =>
            knex('books').insert([
                { author: 'rowValue1222', title: 'moi', year: 1992, tags: 'heeii', related: 'hoii', type: 'book' },
            ]),
        )
        .then(() =>
            knex('books').insert([
                {
                    author: 'rowValue122dsadasd2',
                    title: 'moi',
                    year: 1992,
                    tags: 'heeii',
                    related: 'hoii',
                    type: 'book',
                },
            ]),
        );
