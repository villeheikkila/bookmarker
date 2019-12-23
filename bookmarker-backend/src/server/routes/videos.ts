const Router = require('koa-router');
const queries = require('../db/queries/videos');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/videos`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const videos = await queries.getAllVideos();

        ctx.body = {
            status: 'success',
            data: videos,
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const video = await queries.getSingleVideo(ctx.params.id);

        if (video.length) {
            ctx.body = {
                status: 'success',
                data: video,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That video does not exist.',
            };
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        const body = ctx.request.body;
        body.type = 'video';
        const video = await queries.addVideo(body);

        if (video.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: video,
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
        const video = await queries.updateVideo(ctx.params.id, ctx.request.body);

        if (video.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: video,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That video does not exist.',
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
        const video = await queries.deleteVideo(ctx.params.id);

        if (video.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: video,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That video does not exist.',
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
