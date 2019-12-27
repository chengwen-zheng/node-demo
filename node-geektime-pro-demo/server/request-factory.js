function factory(config) {
    if (!requestors[config.protocol] && !requestors['default']) {
        throw new Error(`暂不支持的协议: ${config.protocol}`);
    }

    config.before = config.before || (d => d);
    config.then = config.then || (d => d);
    config.catch = config.catch || (d => d);

    requestors[config.protocol].compile(config);

    return function (data) {
        try {
            data = config.before(data)
        } catch (e) {
            config.catch(e);
            return Promise.resolve(null);
        }
        return requestors[config.protocol]
            .request(data)
            .then(config.then)
            .catch(config.catch)
    }
}

const requestors = {}

/**
 * @param protocol 数据源协议名字
 * @param requestor{function} 请求流程定义
 */
factory.registerProtocol = function (protocol, requestor) {
    requestors[protocol] = requestor;
}


module.exports = factory;
