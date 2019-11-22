

// 第 25 题：浏览器和Node 事件循环的区别

// /* 测试1 */

// function test () {
//   console.log('start')
//    setTimeout(() => {
//        console.log('children2')
//        Promise.resolve().then(() => {console.log('children2-1')})
//    }, 0)
//    setTimeout(() => {
//        console.log('children3')
//        Promise.resolve().then(() => {console.log('children3-1')})
//    }, 0)
//    Promise.resolve().then(() => {console.log('children1')})
//    console.log('end') 
// }

// test()

// console.log('======测试2 开始========')

/* 测试 2 */

// function sleep(time) {    
// 	let startTime = new Date();    
// 	while (new Date() - startTime < time) {}    
// 	console.log('<--Next Loop-->');
// }

// setTimeout(() => {    
// 	console.log('timeout1');
//     setTimeout(() => {        
//     	console.log('timeout3');
//         sleep(1000);
//     });    
//     new Promise((resolve) => {        
//     	console.log('timeout1_promise');
//         resolve();
//     }).then(() => {        
//     	console.log('timeout1_then');
//     });
//     sleep(1000);
// });
     
// setTimeout(() => {    
// 	console.log('timeout2');
//     setTimeout(() => {        
//     	console.log('timeout4');
//         sleep(1000);
//     });    
//     new Promise((resolve) => {        
//     	console.log('timeout2_promise');
//         resolve();
//     }).then(() => {       
//     	console.log('timeout2_then');
//     });
//     sleep(1000);
// });

/* 测试三 */
console.log('======测试3 开始========')

console.log(1);

setTimeout(() => {
    console.log(2)
    new Promise((resolve) => {
        console.log(6);
        resolve(7);
    }).then((num) => {
        console.log(num);
    })
});

setTimeout(() => {
    console.log(3);
       new Promise((resolve) => {
        console.log(9);
        resolve(10);
    }).then((num) => {
        console.log(num);
    })
    setTimeout(()=>{
    	console.log(8);
    })
})

new Promise((resolve) => {
    console.log(4);
    resolve(5)
}).then((num) => {
    console.log(num);
    new Promise((resolve)=>{
    	console.log(11);
    	resolve(12);
    }).then((num)=>{
    	console.log(num);
    })
});

// 1,4,5,11,12,2,6,7,3,9,10,8 浏览器执行结果

// 1,4,5,11,12,2,6,3,9,7,10,8 node执行结果


/* 差异体现在nodeV10之前
浏览器是执行完一个宏任务就会去清空微任务队列；node则是将同源的宏任务队列执行完毕后再去清空微任务队列；
另外,宏任务内若嵌套同源宏任务，仍会放进一个队列，但是执行将会放在下一次事件循环；
（举个例子，timeoutTwo中包含一个timeoutThree，timeoutThree仍会放进setTimeout队列，但并不会与one、two一起执行完毕，而是等到清空微任务队列的下一次循环时执行) */