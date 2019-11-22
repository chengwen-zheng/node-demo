class Scheduler {
    constructor() {
        this.list = []   //promise list
        this.cur = 0   //current position
        this.max = 2
    }

    add(promiseCreator) {
        let temp = null;

        if (this.cur < this.max) {
            temp = promiseCreator();
        } else {
            let arr = this.list.slice(0, this.cur - 1);
            let all = Promise.all(arr);

            temp = Promise.race([all, this.list[this.cur - 1]])
                .then(() => {
                    return promiseCreator();
                });
        }

        this.list.push(temp);
        this.cur++;
        return temp;
    }
}