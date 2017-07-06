# 基于phaser的前端h5项目目录快速生成器

## 安装
>Note:  Intstall [Node.js](https://nodejs.org/en/), [Gulp](http://gulpjs.com/), [Bower](https://bower.io/) First

1. **Get [Yeoman](http://yeoman.io/) and **`generator-phaser-h5` via [npm](https://www.npmjs.com/).**

   ```sh
       npm install --global yo                    # Install Yeoman if you don't have it yet.
       npm install --global generator-phaser-h5   # Install generator-phaser-h5
   ```

2. **Create a directory to keep your project contents and go into it.**

    ```sh
    mkdir myproject
    cd myproject
    ```

3. **Create your new game project.**

    ```sh
    yo phaser-h5
    ```

4. **Launch it!**

    ```sh
    gulp          #'connect', 'watch', 'build'
    gulp build    #'clean', 'copy', 'copylibs', 'compile', 'minifycss', 'processhtml', 'minifyhtml'
    ```

    ​


## 文档目录结构

    ├── src
    │   ├── assets
    │   │   ├── img
    │   │   └── video
    │   ├── css
    │   │   └── css.css
    │   ├── js
    │   │   ├── entities
    │   │   ├── states
    │   │   │
    │   │   └── main.js
    │   │
    │   └── bower_components
    │
    ├── node_modules
    ├── index.html
    ├── package.json
    ├── gulpfile.js
    ├── bower.json
    ├── .jshintrc        
    └── .bowerrc 

## 参考资料

[Generator API](http://yeoman.github.io/generator/)

[generator-phaser-plus](https://github.com/rblopes/generator-phaser-plus)

[开发自己的 yeoman 脚手架（generator-reactpackage）](https://juejin.im/entry/57c938510e3dd90063e3c725)

## License
[MIT License](https://github.com/Sanchez3/generator-phaser-h5/blob/master/LICENSE)
