var path = require('path');
var chalk = require('chalk'); //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay'); //yeoman弹出框
var path = require('path');
var updateNotifier = require('update-notifier');
// var pkg = require('../package.json');

var H5package = yeoman.Base.extend({
    info: function() {
        // var notifier = updateNotifier({ pkg });
        // Notify using the built-in convenience method 
        // notifier.notify();
        // `notifier.update` contains some useful info about the update
        // this.log(chalk.red(
        //     'notifier.update'
        // ));
        this.log(chalk.green(
            'Start Build'
        ));
    },
    generateBasic: function() { //按照自己的templates目录自定义
        this.directory('src', 'src'); //拷贝目录
        this.copy('package.json', 'package.json'); //拷贝文件
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
            bower: true,
            npm: true,
            callback: function() {
                console.log('Install Dependencies!');
            }
        });
    },
    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }
});
module.exports = H5package;
