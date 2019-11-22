
const mongoose = require("mongoose");
const http = require("http");

const db = mongoose.createConnection(`mongodb://54.255.200.144:27017/test`);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log('we are connected to the database');
});
/* const server = http.createServer((req, res) => {
  if(req.url === '/error'){
      throw 'Intended Error';
  }
  res.end('Hello world');
});



server.listen('3000', 'localhost', () => {
  console.log(`Server running at http://localhost:3000/`);
}); */