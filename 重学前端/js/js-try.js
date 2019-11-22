
// {
//   var i = 1; // normal, empty, empty
//   i ++; // normal, 1, empty
//   console.log(i) //normal, undefined, empty
// } // normal, undefined, empty



// {
//   var i = 1; // normal, empty, empty
//   return i; // return, 1, empty
//   i ++; 
//   console.log(i)
// } // return, 1, empty



// outer: while(true) {
//   console.log("outer")
//   inner: while(true) {
//       console.log("inner1")
//       break outer;
//       console.log("inner2")
//   }
//   console.log("outer after")
// }
// console.log("finished")



function f(){
  console.log(arguments);
}

var a = "world"
f`Hello ${a}!`; // [["Hello", "!"], world]


