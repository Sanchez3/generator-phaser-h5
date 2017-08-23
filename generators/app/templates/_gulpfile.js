var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    cleancss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
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
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    buffer = require('gulp-buffer'),
    paths;

var watching = false;

paths = {
    assets: ['src/assets/**/*', '!src/assets/css/*', '!src/assets/js/*', '!src/assets/js/**/*.js'],
    css: ['src/assets/css/*.css'],
    libs: [
        'node_modules/Swiper/dist/js/swiper.jquery.min.js',
        'node_modules/phaser/build/phaser.min.js'
    ],
    js: ['src/assets/js/*.js', 'src/assets/js/**/*.js'],
    entry: './src/assets/js/main.js',
    dist: './dist/assets/',
    distcss: './dist/assets/css/',
    distjs: './dist/assets/js',
    rev: {
        revJson: './dist/rev/**/*.json',
        src: './dist/*.html'
    },
    distrevjs: './dist/rev/js',
    distrevcss: './dist/rev/css'
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


gulp.task('copylibs', ['clean'], function(cb) {

    pump([gulp.src(paths.libs),
        gulpif(!watching, uglify()),
        gulp.dest(paths.dist + 'js/lib')
    ], cb);
});

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
    pump([
        browserify({
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
        buffer(),
        rev(),
        gulp.dest(paths.distjs),
        rev.manifest(),
        gulp.dest(paths.distrevjs)
    ], cb);
});

gulp.task('cleancss', ['clean'], function(cb) {
    pump([
        gulp.src(paths.css),
        gulpif(!watching, cleancss({
            keepSpecialComments: false,
            removeEmpty: true
        })),
        rename({ suffix: '.min' }),
        rev(),
        gulp.dest(paths.distcss),
        rev.manifest(),
        gulp.dest(paths.distrevcss)
    ], cb);
});

gulp.task('processhtml', ['clean'], function(cb) {
    pump([
        gulp.src('src/index.html'),
        processhtml({}),
        gulp.dest('./dist/')
    ], cb);
});

gulp.task('rev', ['compile', 'cleancss'], function(cb) {
    pump([
        gulp.src([paths.rev.revJson, paths.rev.src]),
        revCollector({
            replaceReved: true,
        }),
        gulp.dest('./dist/')
    ], cb);
});


gulp.task('htmlmin', ['processhtml'], function(cb) {
    pump([
        gulp.src('dist/index.html'),
        gulpif(!watching, htmlmin({ collapseWhitespace: true })),
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

gulp.task('build', ['clean', 'copy', 'copylibs', 'compile', 'cleancss', 'htmlmin', 'rev']);