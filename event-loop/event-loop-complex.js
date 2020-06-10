// 题目和解释：https://www.taopoppy.cn/node/one_eventLoop.html#%E7%BB%BC%E5%90%88%E5%AE%9E%E4%BE%8B


// 四个宏任务：timers、I \ O callbacks 、 idle,prepare 、 poll 、check 、close callbacks.

// process.nextTick。 这个函数其实是独立于Event Loop之外的，它有一个自己的队列，当每个阶段完成后，如果存在nextTick队列，就会清空队列中的所有回调函数，并且优先于其他microtask执行。
const fs = require('fs')
console.log('start')

fs.writeFile('text.txt', '我写的数据', (err) => {
    if (err) throw err;
    console.log('text1');
});

setTimeout(() => {
    console.log('setTimeout 1')
    Promise.resolve()
        .then(() => {
            console.log('promise 3')
        })
})

setTimeout(() => {
    console.log('setTimeout 2')
    Promise.resolve()
        .then(() => {
            console.log('promise 4')
            Promise.resolve()
                .then(() => {
                    console.log('promise 5')
                })
        })
        .then(() => {
            console.log('promise 6')
        })
        .then(() => {
            fs.writeFile('text1.txt', '我写的数据', (err) => {
                if (err) throw err;
                console.log('text2');
            });
            // 这里是延迟一秒的。当把这里面的微任务执行完后。并没有去执行setTimeOut。
            // 假如这里timeOut改成0，则先执行 setTimetOut3, promise 7, promise 8 后执行上面的 I/O callback。
            setTimeout(() => {
                console.log('setTimeout 3')
                Promise.resolve()
                    .then(() => {
                        console.log('promise 7')
                    })
                    .then(() => {
                        console.log('promise 8')
                    })
            }, 1000);


            setTimeout(() => {
                console.log('setTimeout 4')
                new Promise(resolve => {
                    console.log('promise 15')
                    resolve()
                })
                    .then(() => {
                        console.log('promise 9');
                    })
                    .then(() => {
                        console.log('promise 11');
                    })

                // 这个setTimeOut有可能可能会在I/O callbacks之后执行。因为执行上面的setTimeOut宏任务之后要是有I/O callbacks就执行。
                setTimeout(() => {
                    console.log('setTimeout 5')
                    Promise.resolve()
                        .then(() => {
                            console.log('promise 12')
                        })
                        .then(() => {
                            console.log('promise 13')
                        })
                }, 0);
            }, 0);
        })
}, 0);


Promise.resolve()
    .then(() => {
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    })
console.log('end')

