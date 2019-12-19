const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
    // 一般这么用就可以达到cpu利用率达到最高
    for (let i = 0; i < (os.cpus().length / 2); i++) {
        cluster.fork();
    }
} else {
    require('./app')
}