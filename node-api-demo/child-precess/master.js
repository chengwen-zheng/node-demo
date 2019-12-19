const cp = require('child_process');

const process = cp.fork(__dirname + '/child.js');

process.send('haha');

process.on('message', (str) => {
    console.log('parent', str)
})
