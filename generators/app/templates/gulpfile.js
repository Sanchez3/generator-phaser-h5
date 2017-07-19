var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-clean-css'),
    minifyhtml = require('gulp-htmlmin'),
    processhtml = require('gulp-processhtml'),
    jshint = require('gulp-jshint'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    gulpif = require('gulp-if'),
    vinylPaths = require('vinyl-paths'),
    pump = require('pump'),
    paths;

var watching = false;

paths = {
    assets: ['src/assets/**/*','!src/assets/css/*','!src/assets/js/*','!src/assets/js/**/*.js'],
    css: ['src/assets/css/*.css'],
    libs: [
        './src/bower_components/Swiper/dist/js/swiper.jquery.min.js',
        './src/bower_components/phaser-official/build/custom/phaser-no-physics.min.js',
        './src/bower_components/howler.js/howler.min.js',
        './src/bower_components/jquery/dist/jquery.min.js',
        './src/bower_components/gsap/src/minified/TweenMax.min.js',
        './src/bower_components/gsap/src/minified/jquery.gsap.min.js',
        './src/bower_components/progressbar.js/dist/progressbar.min.js',
        // './src/bower_components/distpicker/dist/distpicker.min.js',
    ],
    js: ['src/assets/js/*.js', 'src/assets/js/**/*.js'],
    entry: './src/assets/js/main.js',
    dist: './dist/assets/',
    distcss: './dist/assets/css/',
    distjs: './dist/assets/js'
};

gulp.task('clean', function(cb) {
    pump([
        gulp.src('./dist'),
        vinylPaths(del)
    ], cb);
});

gulp.task('copy', ['clean'], function(cb) {
    pump([gulp.src(paths.assets),
        gulp.dest(paths.dist)
    ], cb);
});


// gulp.task('copylibs', ['clean'], function(cb) {

//     pump([gulp.src(paths.libs),
//         gulpif(!watching, uglify()),
//         gulp.dest(paths.dist + 'js/lib')
//     ], cb);
// });

gulp.task('compile', ['clean'], function(cb) {
    // var bundler = browserify({
    //     cache: {},
    //     packageCache: {},
    //     fullPaths: true,
    //     entries: [paths.entry],
    //     debug: watching
    // });
    // var bundlee = function() {
    //     bundler.bundle(),
    //         source('main.min.js'),
    //         jshint('.jshintrc'),
    //         jshint.reporter('default'),
    //         gulpif(!watching, streamify(uglify())),
    //         gulp.dest(paths.distjs)
    // };
    // if (watching) {
    //     bundler = watchify(bundler);
    //     bundler.on('update', bundlee);
    // }
    pump([browserify({
            cache: {},
            packageCache: {},
            fullPaths: true,
            entries: [paths.entry],
            debug: watching
        }).bundle(),
        source('main.min.js'),
        jshint('.jshintrc'),
        jshint.reporter('default'),
        gulpif(!watching, streamify(uglify())),
        gulp.dest(paths.distjs)
    ], cb);
});

gulp.task('minifycss', ['clean'], function(cb) {
    pump([
        gulp.src(paths.css),
        gulpif(!watching, minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        })),
        rename({ suffix: '.min' }),
        gulp.dest(paths.distcss)
    ], cb);
});

gulp.task('processhtml', ['clean'], function(cb) {
    pump([
        gulp.src('src/index.html'),
        processhtml({}),
        gulp.dest('./dist/')
    ], cb);
});

gulp.task('minifyhtml', ['processhtml'], function(cb) {
    pump([
        gulp.src('dist/index.html'),
        gulpif(!watching, minifyhtml()),
        gulp.dest('./dist/')
    ], cb);

});

gulp.task('html', ['build'], function(cb) {
    pump([
        gulp.src('dist/*.html'),
        connect.reload()
    ], cb);
});

gulp.task('connect', function() {
     connect.server({
        root: ['./dist'],
        port: 9000,
        livereload: true
    });
});

gulp.task('watch', function() {
    watching = true;
    return gulp.watch(['./src/index.html', paths.css, paths.js], ['build', 'html']);
});

gulp.task('default', ['connect', 'watch', 'build']);
gulp.task('build', ['clean', 'copy', 'compile', 'minifycss', 'processhtml', 'minifyhtml']);
