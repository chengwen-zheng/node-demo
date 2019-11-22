class Scheduler {
    constructor() {
        this.queues = [];
        this.max = 2;
        this.cur = 0;
    }

    add(promiseCreator) {
        let temp = null;

        if (this.cur < this.max) {
            temp = promiseCreator()
        } else {
            let arr = this.queues.slice(0, this.cur - 1);
            let all = Promise.all(arr);

            // Promise.reace 一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值，从而异步地解析或拒绝（一旦堆栈为空）
            temp = Promise.race([all, this.queues[this.cur - 1]]).then(() => {
                return promiseCreator();
            })
        }
        this.queues.push(temp);
        this.cur++;
        return temp;
    }
}


const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(order))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4