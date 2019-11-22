// class LazyMan{
//   constructor(name){
//      this.name = name;
//      console.log(`Hi, I am ${this.name}`)
//   }


//   sleep(number){
//     console.log(`等待了${number}...`);
//     return this;
//   }

//   eat(type){
//     console.log(` I am eating ${type}`);
//     return this;
//   }

//   sleepFirst(number){
//     console.log(`等待了${number}...`);
//     return this;
//   }
// }

// new LazyMan('Tony');

// new LazyMan('Tony').sleep(10).eat('lunch');


function LazyMan(name) {
    let _LazyMan = function (name) {
        this.name = name;
        console.log(`Hi, I am ${name}`)
        setTimeout(() => {
            this.excute();
        }, 0);
    }

    _LazyMan.prototype.task = [];
    _LazyMan.prototype.excute = function () {
        let currentTask = this.task.shift();
        currentTask && currentTask();
    };
    _LazyMan.prototype.sleep = function (number) {
        this.task = [...this.task, () => setTimeout(() => {
            console.log(`I am waiting ${number}`)
            this.excute();
        }, number)];
        return this;
    }


    _LazyMan.prototype.eat = function (type) {
        this.task = [...this.task, () => setTimeout(() => {
            console.log(`I am eating ${type}`)
            this.excute();
        }, 0)]
        return this;
    }

    _LazyMan.prototype.sleepFirst = function (number) {
        this.task = [() => setTimeout(() => {
            console.log(`I am waiting ${number}`)
            this.excute();
        }, number), ...this.task];
        return this;
    }

    var man = new _LazyMan(name)
    return man;
}


// LazyMan('Tony')

// LazyMan('Tony').sleep(1000).eat('lunch');
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5000).sleep(1000).eat('junk food');
