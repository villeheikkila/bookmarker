const Router = require('koa-router');
const queries = require('../db/queries/articles');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/articles`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const articles = await queries.getAllArticles();

        ctx.body = {
            status: 'success',
            data: articles,
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const article = await queries.getSingleArticles(ctx.params.id);

        if (article.length) {
            ctx.body = {
                status: 'success',
                data: article,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That article does not exist.',
            };
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        const body = ctx.request.body;
        body.type = 'article';
        const article = await queries.addArticle(body);

        if (article.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: article,
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.',
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.',
        };
    }
});

router.put(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const article = await queries.updateArticle(ctx.params.id, ctx.request.body);

        if (article.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: article,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That article does not exist.',
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.',
        };
    }
});

router.delete(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const article = await queries.deleteArticle(ctx.params.id);

        if (article.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: article,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That article does not exist.',
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.',
        };
    }
});

module.exports = router;
