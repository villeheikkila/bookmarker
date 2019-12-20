const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const bookRoutes = require('./routes/books');
const articleRoutes = require('./routes/articles');
const blogpostRoutes = require('./routes/blogposts');
const videoRoutes = require('./routes/videos');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(bookRoutes.routes());
app.use(articleRoutes.routes());
app.use(blogpostRoutes.routes());
app.use(videoRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
