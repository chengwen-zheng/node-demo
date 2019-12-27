const requestFactory = require('./request-factory');
let config = require('../business/page.data');

requestFactory.registerProtocol('geek-rpc',
    require('./requestors/geek-rpc')
);
requestFactory.registerProtocol('http',
    require('./requestors/http')
);


let articleRequest = requestFactory(config.articleList);
let columnRequest = requestFactory(config.column);


articleRequest().then(function (data) {
   console.log(data);
}).catch((err)=>{
   console.error((err));
})
columnRequest({columnid: 1}).then(function (data) {
    console.log(data);
}).catch((err)=>{
    console.error((err));
})
