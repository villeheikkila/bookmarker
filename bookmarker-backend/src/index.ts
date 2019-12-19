import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

interface HelloRequest {
    name: string;
}

router.post('/', async (ctx, next) => {
    const { name } = <HelloRequest>ctx.request.body;
    ctx.body = { name };
    await next();
});

app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Koa started on port 3000');
});
