const Router = require('koa-router');
const articleQueries = require('../db/queries/articles');
const blogpostQueries = require('../db/queries/blogposts');
const bookQueries = require('../db/queries/books');
const videoQueries = require('../db/queries/videos');

import { Context } from 'koa';

interface Response {
    [key: string]: any;
}

const router = new Router();
const BASE_URL = `/api`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const articles = await articleQueries.getAllArticles();
        const blogposts = await blogpostQueries.getAllBlogposts();
        const books = await bookQueries.getAllBooks();
        const videos = await videoQueries.getAllVideos();

        const response: Response = {};
        response['articles'] = articles;
        response['books'] = books;
        response['videos'] = videos;
        response['blogposts'] = blogposts;

        ctx.body = {
            status: 'success',
            data: response,
        };
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
