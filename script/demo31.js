/* 1.改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
*/
// for (var i = 0; i< 10; i++){
//   test(i);
// }

// function test(i){
//   setTimeout(() => {
//     console.log(i);
//     }, 1000)
// }


/* 2.改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
*/


for (let i = 0; i < 10; i++){
  // let 属于块作用域，没执行一次就开辟了一块新的作用域
	setTimeout(() => {
    console.log(i); 
    }, 1000);
}
