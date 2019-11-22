// 第 8 题：setTimeout、Promise、Async/Await 的区别 #33

// 1. setTimeout


// console.log('script start')	//1. 打印 script start
// setTimeout(function(){
//     console.log('settimeout')	// 4. 打印 settimeout
// })	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
// console.log('script end')	//3. 打印 script start
// // 输出顺序：script start->script end->settimeout

// 2. Promise
// console.log('script start')
// let promise1 = new Promise(function (resolve) {
//     console.log('promise1')
//     resolve()
//     console.log('promise1 end')
// }).then(function () {
//     console.log('promise2')
// })
// setTimeout(function(){
//     console.log('settimeout')
// })
// console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout

/* 当JS主线程执行到Promise对象时，

promise1.then() 的回调就是一个 task

promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue

promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中

setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况 */


// 3. async 与 await
async function async1(){
  console.log('async1 start');
  // 这里先返回了
   await async2();
   console.log('async1 end')
}
async function async2(){
   console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end


// async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。
// 可以理解为，是让出了线程，跳出了 async 函数体。


function* generator(i) {
  console.log('inside before')
  yield i;
  yield i + 10;
  console.log('inside after')
}

var gen = generator(10);
console.log('outside before')
console.log(gen.next().value);
console.log(gen.next().value);
console.log('outside after')
// gen.next();