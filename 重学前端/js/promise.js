// function sleep(duration) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, duration);
//   })
// }
// sleep(1000).then(() => console.log("finished"));


// var r = new Promise(function (resolve, reject) {
//   console.log("a");
//   resolve()
// });
// r.then(() => console.log("c"));
// console.log("b")


// var r = new Promise(function (resolve, reject) {
//   console.log("a");
//   resolve()
// });
// setTimeout(() => console.log("d"), 0);
// r.then(() => console.log("c"));
// console.log("b");





// function sleep(duration) {
//   return new Promise(function(resolve, reject) {
//     console.log("b");
//     setTimeout(resolve,duration);
//   })
// }
// console.log("a");
// sleep(0).then(()=>console.log("c"));
// console.log('d')




function sleep(duration) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve,duration);
  })
}
async function foo(name){
  await sleep(2000)
  console.log(name);
}
async function foo2(){
  await foo("a");
  await foo("b");
}

sleep(0).then(()=>{
    foo2();
})
