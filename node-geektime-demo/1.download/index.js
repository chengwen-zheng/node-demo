const Koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

let app = new Koa();

// 设置静态文件夹
app.use(
  static(__dirname + './source/')
);

app.use(
  mount('/',async (ctx)=>{
    ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8');
  })
)

// app.listen(3000);

module.exports = app;