const knex = require('../connection');

interface Article {
    author: string;
    title: string;
    publisher: string;
    date: Date;
    year: number;
    tags: string;
    related: string;
}

const getAllArticles = () => {
    return knex('articles').select('*');
};

const getSingleArticle = (id: string) => {
    return knex('articles')
        .select('*')
        .where({ id: parseInt(id) });
};

const addArticle = (article: Article) => {
    return knex('articles')
        .insert(article)
        .returning('*');
};

const updateArticle = (id: string, article: Article) => {
    return knex('articles')
        .update(article)
        .where({ id: parseInt(id) })
        .returning('*');
};

const deleteArticle = (id: string) => {
    return knex('articles')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
};

module.exports = {
    getSingleArticle,
    getAllArticles,
    addArticle,
    updateArticle,
    deleteArticle,
};

export {};
