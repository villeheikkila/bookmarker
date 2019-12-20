const knex = require('../connection');

interface Blogpost {
    title: string;
    url: string;
    author: string;
    comment: string;
    related: string;
}

const getAllBlogposts = () => {
    return knex('blogposts').select('*');
};

const getSingleBlogpost = (id: string) => {
    return knex('blogposts')
        .select('*')
        .where({ id: parseInt(id) });
};

const addBlogpost = (blogpost: Blogpost) => {
    return knex('blogposts')
        .insert(blogpost)
        .returning('*');
};

const updateBlogpost = (id: string, blogpost: Blogpost) => {
    return knex('blogposts')
        .update(blogpost)
        .where({ id: parseInt(id) })
        .returning('*');
};

const deleteBlogpost = (id: string) => {
    return knex('blogposts')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
};

module.exports = {
    getSingleBlogpost,
    getAllBlogposts,
    addBlogpost,
    updateBlogpost,
    deleteBlogpost,
};

export {};
