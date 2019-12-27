const fs = require('fs');

module.exports = {
    '/play': {
        data: require('./page.data'),
        template: fs.readFileSync(__dirname+'/play.template.html')
    }
}