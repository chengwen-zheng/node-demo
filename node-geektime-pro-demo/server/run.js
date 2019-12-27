const mount = require('koa-mount');
const createTemplate = require('./create-template');
const requestFactory = require('./request-factory');

requestFactory.registerProtocol('geek-rpc',
    require('./requestors/geek-rpc')
);
requestFactory.registerProtocol('http',
    require('./requestors/http')
);

module.exports = function (app) {
    const koa = new (require('koa'));
    koa.use(async (ctx, next) => {
        if (ctx.url === '/favicon.io') {
            return;
        }
        await next();
        Object.keys(app).forEach(routePath => {
            const dataConfig = eval(app[routePath].data);

            const requests = Object.keys(dataConfig)
                .reduce((ret, key) => {
                    ret[key] = requestFactory(dataConfig[key]);
                    return ret
                }, {});
            const template = createTemplate(app[routePath].template);

            koa.use(mount(routePath, async (ctx) => {
                ctx.status = 200;
                const result = {};
                await Promise.all(
                    Object.keys(requests).map(key => {
                        return requests[key](ctx.query)
                            .then(res => {
                                result[key] = res;
                                return res;
                            })
                    })
                );
                ctx.body = template(result);
            }))
        })
    })
    koa.listen(3000);
}