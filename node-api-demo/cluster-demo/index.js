const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
    // 一般这么用就可以达到cpu利用率达到最高
    for (let i = 0; i < (os.cpus().length / 2); i++) {
        //a. 心跳检测.(可以检测因为堵塞造成的假死)
        const worker = cluster.fork();
        let missedPing = 0;
        let inter = setInterval(() => {
            console.log('ping')
            worker.send("ping")
            missedPing++;
            // 表示该进程是个死进程
            if (missedPing >= 3) {
                // worker.exit(1);
                clearInterval(inter);
                process.kill(worker.process.pid)
            }
        }, 300)
        worker.on('message', (message => {
            if (message === 'pong') {
                console.log('pong')
                missedPing--;
            }
        }))


        // b.死亡重启
        cluster.on('exit', () => {
            //一旦有子进程挂掉,立马重启一个进程,但这种也有问题.(如果你的进程是不停发生的,那么你的程序就是进入不停在创建进程的状态);
            // cluster.fork();
            // setTimeout是为了解决上面所说的不停创建进程的问题
            setTimeout(() => {
                cluster.fork();
            }, 5000);
        })
    }
} else {
    require('./app');
    // a.心跳检测的回应
    process.on('message', (message => {
        if (message === 'ping') {
            process.send('pong');
        }
    }))

    // b.死亡重启
    process.on('uncaughtException', (e) => {
        // 在这里做监控
        console.error(e);
        process.exit(1);
    })
    //c. 内存泄漏的监控
    setInterval(() => {
        console.log(process.memoryUsage().rss);
        if (process.memoryUsage().rss > 734003200) {
            console.log('boom');
            process.exit(1);
        }
    }, 5000);
}