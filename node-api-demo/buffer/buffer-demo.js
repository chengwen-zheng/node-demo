//protocol-buffers
const fs = require('fs');
const protobuf = require('protocol-buffers');
const schema = protobuf(fs.readFileSync(__dirname + '/demo.proto','utf-8'));

console.log(schema);

const buffer = schema.Leon.encode({
  age:289,
  name:'hahha'
});

console.log(schema.Leon.decode(buffer));