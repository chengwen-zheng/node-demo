// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve()
//   console.log(2)
// })

// promise.then(() => {
//   console.log(3)
// })

// console.log(4)

// 1,3,4,2

/* promise构造函数是同步执行的，then方法是异步执行的
 */

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => {
  console.log(val);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

setTimeout(function() {
  console.log(6);
});

//1,2,4,5,3,6