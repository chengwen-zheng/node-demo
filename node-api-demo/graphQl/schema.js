const buildSchema = require('graphql').buildSchema;

// 如何返回一个数组。

let mockDataBase = [{
    id: 1,
    avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
    name: '僵尸浩',
    isTop: true,
    content: '哈哈哈哈',
    publishDate: '今天',
    commentNum: 10,
    praiseNum: 5,
    hello: ['leon', 'leon']
}, {
    id: 2,
    avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
    name: '僵尸浩',
    isTop: true,
    content: '不错',
    publishDate: '今天',
    commentNum: 10,
    praiseNum: 5,
    hello: ['movie', 'movie']
}]

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
}

type Mutation {
   setPraiseNum(id: Int!): Int
}`);


schema.getQueryType().getFields().comm.resolve = () => {
    return mockDataBase;
}


schema.getQueryType().getFields().hello.resolve = () => {
    return {
        name: 'Hello, World!'
    }
}

schema.getMutationType().getFields().setPraiseNum.resolve = (arg0, {id}) => {
    //假设id唯一性
    mockDataBase.filter(common => common.id === id)[0].praiseNum++;
    return mockDataBase.filter(common => common.id === id)[0].praiseNum;
}

module.exports = schema;