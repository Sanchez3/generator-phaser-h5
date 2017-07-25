# 前端h5项目目录快速生成器
**h5 ≠ `<h5></h5>` ,  h5 ≠ html5,  h5 ≠ car haval5.**

**h5 = Web page or Web app etc.**

[How do you think of some Chinese call HTML5 'H5'](https://news.ycombinator.com/item?id=9875940)

起初是基于phaser的。
若不使用phaser，仍可利用[Gulp](http://gulpjs.com/)自动化构建工具。
~~利用[Bower](https://bower.io/)添加所要用的插件eg. threejs, pixijs~~

>Note:...psst! While Bower is maintained, we recommend yarn and webpack for new front-end projects!



## 安装/Usage
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

通过npm管理插件，devDependencies  里面的插件只用于开发环境，不用于生产环境，而 dependencies  是需要发布到生产环境的。



### devDependencies:
*Note:  `npm install <packages> --save-dev`*

- [browserify](https://github.com/substack/node-browserify)  for bundling up all of your dependencies.
- [gulp-plugins](http://gulpjs.com/plugins/)  for 'clean', 'copy', 'compile', 'minifycss', 'processhtml', 'minifyhtml' task
- [jshint](http://jshint.com/)  for Static Code Analysis Tool

### dependencies:
*Note:  `npm install <packages>`*

- [phaser-official](https://phaser.io/)  for HTML5 games and 2d canvas
- [howler.js](https://howlerjs.com/)  for audio 
- [jquery](https://jquery.com/)  for ajax 
- [Gsap](https://greensock.com/gsap) for javascript animation
- [animate.css](https://daneden.github.io/animate.css/)  for CSS animation style 


### others:
*Note: Their Documentation For a Getting started guide, Usage , API docs, etc. check out or docs!*

- [better-picker](https://github.com/ustbhuangyi/picker)  for  address picker 
- [Swiper](http://idangero.us/swiper/) for slider
- [Chart.js](http://www.chartjs.org/) for chart
- [tracking.js](https://github.com/eduardolundgren/tracking.js)  for tracking  face etc.
- [AlloyImage](https://github.com/AlloyTeam/AlloyImage)  for image processing lib


**Note:** Use the following ways Sometime:

- [browserify](https://github.com/substack/node-browserify#brequirefile-opts)  Make `file` available from outside the bundle with `require(file)`
- [browserify-shim](https://github.com/thlorenz/browserify-shim) Make CommonJS-Incompatible Files Browserifyable



## 文档目录结构

```sh
    .
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

[前端模块及依赖管理的新选择：Browserify](http://acgtofe.com/posts/2015/06/modular-javascript-with-browserify)

## License

[MIT License](https://github.com/Sanchez3/generator-phaser-h5/blob/master/LICENSE)
