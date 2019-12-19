const Koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

let app = new Koa();

// 设置静态文件夹
app.use(
    static(__dirname + './source/')
);

/*node优化,减少不必要的计算*/
const str = fs.readFileSync(__dirname + '/source/index.htm');
app.use(
    mount('/', async (ctx) => {
        ctx.body = str;
        ctx.type = 'html';
        ctx.status = 200;
    })
)

// app.listen(3000);

module.exports = app;