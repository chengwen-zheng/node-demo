const net = require('net');

let oldBuffer = null;
const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        // console.log(lessonid);

        // setTimeout(() => {
        //   socket.write(Buffer.concat([
        //     seqBuffer,
        //     Buffer.from(data[lessonid])
        //   ]));
        // }, 10 + Math.random() * 1000)
        // 把上一次data事件使用残余的buffer接上来
        if (oldBuffer) {
            buffer = Buffer.concat([oldBuffer, buffer]);
        }

        let packageLength = 0;
        while (packageLength = checkComplete(buffer)) {
            // 切割接收到的buffer
            const package = buffer.slice(0, packageLength);
            buffer = buffer.slice(packageLength);
            // 将切割到的buffer拿来解码
            const result = decode(package);

            // 计算得到要返回的结果，并write返回
            socket.write(
                encode(data[result.data], result.seq)
            );
        }
        oldBuffer = buffer;
    })
});

server.listen(4000);

const data = {
    136797: "01 | 课程介绍",
    136798: "02 | 内容综述",
    136799: "03 | Node.js是什么？",
    136800: "04 | Node.js可以用来做什么？",
    136801: "05 | 课程实战项目介绍",
    136803: "06 | 什么是技术预研？",
    136804: "07 | Node.js开发环境安装",
    136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136807: "09 | 模块：CommonJS规范",
    136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
    136809: "11 | 模块：npm",
    141994: "12 | 模块：Node.js内置模块",
    143517: "13 | 异步：非阻塞I/O",
    143557: "14 | 异步：异步编程之callback",
    143564: "15 | 异步：事件循环",
    143644: "16 | 异步：异步编程之Promise",
    146470: "17 | 异步：异步编程之async/await",
    146569: "18 | HTTP：什么是HTTP服务器？",
    146582: "19 | HTTP：简单实现一个HTTP服务器"
}


function checkComplete(buffer) {
    if (buffer < 6) {
        return 0;
    }

    const bodyLength = buffer.readInt32BE(2);
    return 6 + bodyLength;
}


/**
 * 二进制包编码函数
 * 在一段rpc调用里，服务端需要经常编码rpc调用时，业务数据的返回包
 */
function encode(data, seq) {
    // 正常情况下，这里应该是使用 protobuf 来encode一段代表业务数据的数据包
    // 为了不要混淆重点，这个例子比较简单，就直接把课程标题转buffer返回
    const body = Buffer.from(data)

    // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
    // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
    const header = Buffer.alloc(6);
    header.writeInt16BE(seq)
    header.writeInt32BE(body.length, 2);

    const buffer = Buffer.concat([header, body])

    return buffer;
}


/**
 * 二进制包解码函数
 * 在一段rpc调用里，服务端需要经常解码rpc调用时，业务数据的请求包. 这里仅仅是简单的string.
 */

function decode(buffer) {
    const header = buffer.slice(0, 6);
    const seq = header.readInt16BE();

    // 正常情况下，这里应该是使用 protobuf 来decode一段代表业务数据的数据包
    // 为了不要混淆重点，这个例子比较简单，就直接读一个Int32即可
    const body = buffer.slice(6).readInt32BE()

    // 这里把seq和数据返回出去
    return {
        seq,
        data: body
    }
}