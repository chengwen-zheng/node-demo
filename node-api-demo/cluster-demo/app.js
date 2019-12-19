const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(`./index.htm`, 'utf-8'));
})


server.listen(3000, () => {
    console.log('正在监听3000端口')
})