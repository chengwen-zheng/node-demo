
// process.nextTick的执行顺序.

// console.log(1)
// Promise.resolve().then(() => {
//     console.log('promise one')
// })
// process.nextTick(() => {
//     console.log('nextTick one')
// })
//
// setTimeout(() => {
//     process.nextTick(() => {
//         console.log('nextTick two')
//     })
//     console.log(3)
//     Promise.resolve().then(()=> {
//         console.log('promise two')
//     })
//     console.log(4)
// }, 3);

// 浏览器和node执行差异

setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 浏览器和node11的执行顺序: timer1 promise1 timer2 promise2
// node(10以前)执行顺序： timer1 timer2 promise1 promise2