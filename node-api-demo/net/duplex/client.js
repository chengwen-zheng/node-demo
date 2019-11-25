const net = require('net');
const socket = new net.Socket({});


const lessonids = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

let seq = 0;

let lessonid = lessonids[Math.floor(Math.random() * lessonids.length)];
socket.write(encode(lessonid));
  
// 接收返回的数据
socket.on('data', (buffer) => {
  console.log(buffer.slice(0, 2).readInt16BE(), buffer.slice(2).toString());
})


function encode(id) {
  let bodyBuf = Buffer.alloc(4);
  bodyBuf.writeInt32BE(id);

  let headerBuf = Buffer.alloc(2);
  headerBuf.writeInt16BE(seq);

  console.log(id, seq);
  let lessonidBuf = Buffer.concat([headerBuf, bodyBuf]);
  seq++;
  return lessonidBuf;
}


// setInterval(()=>{
//   模拟不停的发送请求,并且时间间隔不同。
//   let lessonid = lessonids[Math.floor(Math.random() * lessonids.length)];
//   socket.write(encode(lessonid));
// },10 + Math.random() * 1000);


for (let k = 0; k < 100; k++) {
  let lessonid = lessonids[Math.floor(Math.random() * lessonids.length)];
  socket.write(encode(lessonid));
}