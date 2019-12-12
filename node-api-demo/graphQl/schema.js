const buildSchema = require('graphql').buildSchema;

// 如何返回一个数组。


const schema = buildSchema(`
type Hello {
  name: String
}

type Comment {
  id: Int
  avatar: String
  name: String
  isTop: Boolean
  content: String
  publishDate: String
  commentNum: Int
  praiseNum: Int,
  hello:[String]
}

type Query {
  comm: [Comment],
  hello: Hello
}`);



schema.getQueryType().getFields().comm.resolve = ()=>{
  return  [
    {
      id: 2,
      avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
      name: '僵尸浩',
      isTop: true,
      content: '哈哈哈哈',
      publishDate: '今天',
      commentNum: 10,
      praiseNum: 5,
      hello:['leon','leon']
    },{
      id: 2,
      avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
      name: '僵尸浩',
      isTop: true,
      content: '哈哈哈哈',
      publishDate: '今天',
      commentNum: 10,
      praiseNum: 5,
      hello:['movie','movie']
  }]
}


schema.getQueryType().getFields().hello.resolve = ()=>{
  return {
        name: 'Hello, World!'
    }
}



module.exports = schema;