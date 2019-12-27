const fs = require('fs');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const mkdirp = require('mkdirp');
const mfs = new MemoryFS();

module.exports = function (
    businessName,
    dataJSPath,
    templatePath
) {

    //   将模板上传到服务器端
    mkdirp.sync(__dirname + '/../business/' + businessName);

    fs
        .createReadStream(templatePath)
        .pipe(fs.createWriteStream(__dirname + '/../business/' + businessName + '/template.tpl'));


    //   wepack配置
    const compileTask = webpack({
        mode: 'development',
        devtool: false,
        target: 'node',

        entry: dataJSPath,

        module: {
            rules: [
                {test: /.proto$/, use: 'text-loader'}
            ]
        },

        output: {
            path: "/whatever",
            filename: "data.js"
        }
    })

    compileTask.outputFileSystem = mfs;
    //   将data.js(业务代码)上传到服务器
    compileTask.run((err, stats) => {
        if (err) return;
        // 从output中读取文件
        const content = mfs.readFileSync('/whatever/data.js');
        // 这里是上传到服务器.这里用文件夹代替.真实的情况可能不同。
        fs.writeFileSync(__dirname + '/../business/' + businessName + '/data.js', content);
    })

}