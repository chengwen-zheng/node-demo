var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
// obj.push(1);
// obj.push(2);
// obj.push(5);
console.log(obj);
// 伪数组，此时length长度设置为0，push方法从第0项开始插入，所以填充了第0项的empty
