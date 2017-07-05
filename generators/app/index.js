var path = require('path');
var chalk = require('chalk'); //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay'); //yeoman弹出框
var path = require('path');
var H5package = yeoman.Base.extend({
    info: function() {
        this.log(chalk.green(
            'Start Build'
        ));
    },
    generateBasic: function() { //按照自己的templates目录自定义
        this.directory('src', 'src'); //拷贝目录
        this.copy('package.json', 'package.json'); //拷贝文件
        this.copy('index.html', 'index.html');
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.jshintrc', '.jshintrc');
        // this.copy('README.md', 'README.md');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('bower.json', 'bower.json');
    },
    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        this.destinationPath('./');
    },
    install: function() { //安装依赖
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }
});
module.exports = H5package;
