const childProcess = require('child_process')
const net = require('net')
const cpuNum = require('os').cpus().length
const path = require('path')
const workerPath = path.resolve(__dirname, 'worker.js')

// 创建工作进程
let workers = []
let cur = 0
// let handlder = {
//     type: "success"
// }
for (let i = 0; i < cpuNum; ++i) {
    workers.push(childProcess.fork(workerPath))
    console.log('Create worker-' + workers[i].pid)
}

// 创建TCP服务器
const server = net.createServer()

// 服务器收到请求后分发给工作进程去处理
// 通过轮转方式实现工作进程的负载均衡
server.on('connection', (socket) => {
    // worker只能发送句柄
    // net.Socket TCP套接字
    // net.Server TCP服务器，任意建立在TCP服务上的应用层服务都可以享受它带来的好处
    // net.Native C++层面的TCP套接字或IPC管道
    // dgram.Socket UDP套接字
    // dgram.Native C++层面的UDP套接字
    // workers[cur].send('testSend', handlder)
    workers[cur].send('socket', socket)
    cur = Number.parseInt((cur + 1) % cpuNum)


})

server.listen(8080, () => {
    console.log('TCP server: 127.0.0.1:8080')
})
