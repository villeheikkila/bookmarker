const knex = require('../connection');

interface Book {
    author: string;
    title: string;
    year: Number;
    tags: string;
    related: string;
}
const getAllBooks = () => {
    return knex('books').select('*');
};

const getSingleBook = (id: string) => {
    return knex('books')
        .select('*')
        .where({ id: parseInt(id) });
};

const addBook = (book: Book) => {
    return knex('books')
        .insert(book)
        .returning('*');
};

const updateBook = (id: string, book: Book) => {
    return knex('books')
        .update(book)
        .where({ id: parseInt(id) })
        .returning('*');
};

const deleteBook = (id: string) => {
    return knex('books')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
};

module.exports = {
    getSingleBook,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
};
