const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const bookRoutes = require('./routes/books');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(bookRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
