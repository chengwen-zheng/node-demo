const http = require('http');
const fs = require('fs');

// 模拟内存泄漏
let leak = [];

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    setTimeout(() => {

        // 模拟发生错误
        // console.log(window);
        const result = fs.readFileSync(`./index.htm`, 'utf-8')
        res.end(result);

        // 模拟内存泄漏
        // leak.push(result);
    }, 50);
})


server.listen(3000, () => {
    console.log('正在监听3000端口');
    // 模拟堵塞造成的假死
    // while (true) {}
})

