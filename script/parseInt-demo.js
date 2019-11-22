let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))

console.log(parseInt(100,2));  //  converts 100 in base 2 to base 10