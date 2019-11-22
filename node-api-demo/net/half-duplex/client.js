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
})

let lessonid = lessonids[Math.floor(Math.random() * lessonids.length)];
console.log(lessonid)
socket.write(encode(lessonid));

// 接收返回的数据
socket.on('data',(buffer)=>{
  console.log(buffer.toString());
})


function encode(id){
  let lessonidBuf = Buffer.alloc(4);
  lessonidBuf.writeInt32BE(lessonid);
  return lessonidBuf;
}