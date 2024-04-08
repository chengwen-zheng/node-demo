
class Main {
  tasks = [];
  sleep(timeout) {
    const task = () => {
      return new Promise((resolve,reject)=> setTimeout(resolve, timeout));
    }
         
    this.tasks.push(task);
    this.executeTasks(); // 执行任务队列

    return this;
  }

  say(message) {
    const task = () => {
      console.log(message);
    }
    this.tasks.push(task);
    this.executeTasks(); // 执行任务队列
    return this;

  }

  async executeTasks() {
    if (this.executing) {
      return; // 如果任务正在执行，则不重复执行
    }

    this.executing = true;
    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      await task();
    }
    this.executing = false;
  }

}
const ins = new Main();
// 实现 sleep(3000).say(111).sleep(2000).say(222);
ins.sleep(3000).say(111).sleep(2000).say(222);
