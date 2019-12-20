const Router = require('koa-router');
const queries = require('../db/queries/blogposts');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/blogposts`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const blogposts = await queries.getAllBlogposts();

        ctx.body = {
            status: 'success',
            data: blogposts,
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const blogpost = await queries.getSingleBlogpost(ctx.params.id);

        if (blogpost.length) {
            ctx.body = {
                status: 'success',
                data: blogpost,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That blogpost does not exist.',
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
        const blogpost = await queries.addBlogpost(body);

        if (blogpost.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: blogpost,
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
        const blogpost = await queries.updateBlogpost(ctx.params.id, ctx.request.body);

        if (blogpost.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: blogpost,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That blogpost does not exist.',
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
        const blogpost = await queries.deleteBlogpost(ctx.params.id);

        if (blogpost.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: blogpost,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That blogpost does not exist.',
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
