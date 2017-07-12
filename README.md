# 前端h5项目目录快速生成器
起初是基于phaser的。
若不使用phaser，仍可利用[Gulp](http://gulpjs.com/)自动化构建工具。
~~利用[Bower](https://bower.io/)添加所要用的插件eg. threejs, pixijs~~
>Note:...psst! While Bower is maintained, we recommend yarn and webpack for new front-end projects!

## 安装
>Note:  Install [Node.js](https://nodejs.org/en/), [Gulp](http://gulpjs.com/), ~~[Bower](https://bower.io/)~~ First

1. **Get  [Yeoman](http://yeoman.io/) and`generator-phaser-h5` via [npm](https://www.npmjs.com/).**

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


The result in  `dist/`

## 常用插件

~~[Bower](https://bower.io/)管理插件~~

* [phaser-official](https://phaser.io/): for HTML5 games and 2d canvas
* [howler.js](https://howlerjs.com/)  for audio 
* [jquery](https://jquery.com/): for ajax 
* [Swiper](http://idangero.us/swiper/) for slider 
* [Chart.js](http://www.chartjs.org/) for chart
* [animate.css](https://daneden.github.io/animate.css/)  for CSS animation style 
* [Gsap](https://greensock.com/gsap) for javascript animation



## 文档目录结构

```sh
    ├── src
    │   ├── assets
    │   │   ├── img
    │   │   ├── video
    │   │   ├── css
    │   │   │   └── css.css
    │   │   └── js
    │   │       ├── entities
    │   │       ├── states    #phaser state
    │   │       │
    │   │       └── main.js
    │   │
    │   └── bower_components  #js libraries
    │
    ├── node_modules
    ├── index.html
    ├── package.json
    ├── gulpfile.js
    └── .jshintrc   
```

## 打包文档目录 `gulp build`

```sh
   dist
    ├── assets
    │   ├── img
    │   ├── video
    │   ├── css
    │   │   └── css.min.css
    │   └── js
    │       └── main.min.js
    │
    └── index.html
```

## 参考资料

[Generator API](http://yeoman.github.io/generator/)

[generator-phaser-plus](https://github.com/rblopes/generator-phaser-plus)

[开发自己的 yeoman 脚手架（generator-reactpackage）](https://juejin.im/entry/57c938510e3dd90063e3c725)

## License

[MIT License](https://github.com/Sanchez3/generator-phaser-h5/blob/master/LICENSE)
