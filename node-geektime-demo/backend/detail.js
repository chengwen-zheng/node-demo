const fs = require('fs');
const protubuf = require('protocol-buffers');
const schemas = protubuf(
  fs.readFileSync(`${__dirname}/../2.detail/detail.proto`)
)

// mock data
const columnData = require('./mockdata/column')

const server = require('./lib/geeknode-rpc-server')(schemas.ColumnRequest, schemas.ColumnResponse);


server
    .createServer((request, response) => {
        // 因为都是假数据，这里就没有使用栏目id。真实项目会拿这个columnid去请求数据库
        const columnid = request.body;

        // 直接返回假数据
        response.end({
            column: columnData[0],
            recommendColumns: [columnData[1], columnData[2]]
        });
    })
    .listen(4000, ()=> {
        console.log('rpc server listened: 4000')
    });