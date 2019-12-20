const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const mount = require('koa-mount');

const bookRoutes = require('./routes/books');
const articleRoutes = require('./routes/articles');
const blogpostRoutes = require('./routes/blogposts');
const videoRoutes = require('./routes/videos');
const allRoutes = require('./routes/all');

const app = new Koa();
const build = new Koa();
const PORT = process.env.PORT || 1337;

build.use(serve(__dirname + '/build'));
app.use(mount('/', build));

app.use(cors());
app.use(bodyParser());

app.use(bookRoutes.routes());
app.use(articleRoutes.routes());
app.use(blogpostRoutes.routes());
app.use(videoRoutes.routes());
app.use(allRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
