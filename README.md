# generator-phaser-h5

<div align="left">
    <div>
        <a href="https://www.npmjs.com/package/generator-phaser-h5"><img alt="npm version" src="https://img.shields.io/npm/v/generator-phaser-h5.svg"></a>
        <a href="https://travis-ci.org/Sanchez3/generator-phaser-h5"><img alt="Travis CI Build Status" src="https://travis-ci.org/Sanchez3/generator-phaser-h5.svg?branch=master"></a>
        <a href="https://david-dm.org/Sanchez3/generator-phaser-h5"><img alt="dependencies status" src="https://david-dm.org/Sanchez3/generator-phaser-h5/status.svg"></a>
        <a href="https://david-dm.org/Sanchez3/generator-phaser-h5?type=dev"><img alt="devDependencies status" src="https://david-dm.org/Sanchez3/generator-phaser-h5/dev-status.svg"/></a>
        <a href="https://www.npmjs.com/package/generator-phaser-h5"><img alt="Downloads" src="https://img.shields.io/npm/dm/generator-phaser-h5.svg"></a>
    </div>
</div>

**Translations: [简体中文](https://github.com/Sanchez3/generator-phaser-h5/blob/master/README.zh-CN.md)**

`generator-phaser-h5` is a [Yeoman](http://yeoman.io/) plugin that makes starting up [Phaser](http://phaser.io/) **h5** projects simple, quick and easy.


**h5 ≠ `<h5></h5>` ,  h5 ≠ html5,  h5 ≠ car haval5.**

**h5 = Web page or Web app etc.**

[How do you think of some Chinese call HTML5 'H5'](https://news.ycombinator.com/item?id=9875940)

Not only for Phaser, Add Dependencies you want.

*ECMAScript version ES5* 

**Also  Support *ECMAScript version ES6***

~~[Bower](https://bower.io/) manages the things — frameworks, libraries, assets, and utilities.~~

>Note:...psst! While Bower is maintained, we recommend yarn and webpack for new front-end projects!



## Installation
>Note:  Install [Node.js](https://nodejs.org/en/), [Gulp](http://gulpjs.com/), ~~[Bower](https://bower.io/)~~ First

- **Get  [Yeoman](http://yeoman.io/) and `generator-phaser-h5` via [npm](https://www.npmjs.com/).**

    ```sh
    npm install --global yo                    # Install Yeoman if you don't have it yet.
    npm install --global generator-phaser-h5   # Install generator-phaser-h5
    ```




## Usage

1. **Create a directory to keep your project contents and go into it.**

    ```sh
    mkdir myproject
    cd myproject
    ```

2. **Create your new game project.**

    ```sh
    yo phaser-h5
    ```

3. **Launch it!**

    ```sh
    gulp          # Launches the server and opens the page for live development.
    gulp build    # Prepare the h5 release for distribution.
    ```


The result in  `dist/`



## Plugins

~~[Bower](https://bower.io/) manages plugins~~ 

[npm](https://www.npmjs.com/) manages plugins.

`devDependencies` are for the development-related scripts, e.g. unit testing, packaging scripts, documentation generation, etc.

`dependencies` are required for production use, and assumed required for dev as well.

> Note: Please do not put test harnesses, transpilers or `latest` "Matches latest version", `*` "Matches any version" in your dependencies object!
>
> Recommend: `version` "Specifying version", `^version` "Compatible with version"

Frontend environments evolve rapidly nowadays, modern browsers have already implemented a great deal of DOM/BOM APIs which are good enough.  So [You-Dont-Need-jQuery](https://github.com/nefe/You-Dont-Need-jQuery) 

### devDependencies:
*Note:  `npm install <packages> --save-dev`*

- [browserify](https://github.com/substack/node-browserify)  for bundling up all of your dependencies
- [gulp-plugins](http://gulpjs.com/plugins/)  for 'clean', 'copy', 'concatlibs', 'compile', 'minifycss', 'processhtml', 'minifyhtml', 'rev', etc.
  - [gulp-sass](https://www.npmjs.com/package/gulp-sass) for converting to css (Optional)
- [jshint](http://jshint.com/)  for Static Code Analysis Tool
- [Babel](https://babeljs.io/) for the latest version of JavaScript through syntax transformers

### dependencies:
*Note:  `npm install <packages>`*

- [phaser-official](https://phaser.io/)  for HTML5 games and 2d canvas
- [howler.js](https://howlerjs.com/)  for audio 
- ~~[jquery](https://jquery.com/)~~  [ajax](https://github.com/fdaciuk/ajax)  for ajax
- [Gsap](https://greensock.com/gsap)  for javascript animation
- [animate.css](https://daneden.github.io/animate.css/)  for CSS animation style 


### others:
*Note: Read Documentation For a Getting started guide, Usage , API docs, etc. check out or docs!*

- [better-picker](https://github.com/ustbhuangyi/picker)  for  address picker 
- [Swiper](http://idangero.us/swiper/)  for slider
- [Chart.js](http://www.chartjs.org/)  for chart
- [tracking.js](https://github.com/eduardolundgren/tracking.js)  for tracking  face etc.
- [AlloyImage](https://github.com/AlloyTeam/AlloyImage)  for image processing lib
- [Stats](https://github.com/mrdoob/stats.js)  for JavaScript Performance Monitor 



**Use the following ways Sometime:**

- Cdn  [jsDelivr](http://www.jsdelivr.com/), [cdnjs](https://cdnjs.com/), [bootcdn](http://www.bootcdn.cn/) :  
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.js"></script>
  ```

- [browserify](https://github.com/substack/node-browserify#brequirefile-opts)  Make `file` available from outside the bundle with `require(file)`

- [browserify-shim](https://github.com/thlorenz/browserify-shim)  Make CommonJS-Incompatible Files Browserifyable

- Local In `gulpfile.js` Write Libs paths and Run gulp `concatlibs` task:
  ```html
  <script src="/assets/js/lib/libs.js"></script>
  ```

  ​




## Directory Structure

**In development, run `gulp`:**

```sh
    .
    ├── dist
    ├── src
    │   └── assets
    │       ├── img
    │       ├── media         # video audio resources
    │       ├── css
    │       │   ├── css.css
    │       │   └── sass.scss
    │       └── js
    │           ├── entities
    │           ├── states    # phaser state
    │           │
    │           └── main.js    
    │
    ├── node_modules
    ├── index.html
    ├── package.json
    ├── gulpfile.js
    └── .jshintrc   
```

**In production, run `gulp build`:**

```sh
   dist
    ├── assets
    │   ├── img
    │   ├── media
    │   ├── css
    │   │   ├── libs
    │   │   │	 └── *.css 	   # libs css e.g. animate.min.css, swiper.min.css, etc.
    │   │   └── css.min.css
    │   └── js
    │       ├── libs
    │       │    └── libs.js
    │       └── main.min.js
    │
    └── index.html
```



## Versions

### 1.x.x

Only for Phaser 

### 2.x.x

Not only for Phaser , Add Dependencies you want , Without Bower

### 3.x.x

Rebuild Directory Structure



## Reference

[Yeoman Generator API](http://yeoman.github.io/generator/)

[generator-phaser-plus](https://github.com/rblopes/generator-phaser-plus)

[创建 Yeoman Generator 简单教程](http://www.jianshu.com/p/9f3e6bcdb274)

[开发自己的 yeoman 脚手架（generator-reactpackage）](https://juejin.im/entry/57c938510e3dd90063e3c725)

[前端模块及依赖管理的新选择：Browserify](http://acgtofe.com/posts/2015/06/modular-javascript-with-browserify)

[gulp-rev：项目部署缓存解决方案](http://www.cnblogs.com/1wen/p/5421212.html)



## License

[MIT License](https://github.com/Sanchez3/generator-phaser-h5/blob/master/LICENSE)
