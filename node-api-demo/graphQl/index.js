const koa = require('koa');
const graphqlHttp = require('koa-graphql');
const app = new koa();

app.use(
  graphqlHttp({
    schema:require('./schema')
  })
)

app.listen(3000)
 