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
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    babelify = require("babelify"),
    autoprefixer = require('gulp-autoprefixer'),
    paths;

var watching = false;

paths = {
    assets: ['src/assets/**/*', '!src/assets/css/**', '!src/assets/js/**', '!src/assets/.*', '!src/assets/**/.*'],
    css: ['src/assets/css/*.css'],
    sass: ['src/assets/css/*.scss'],
    libs: {
        js: [
            'node_modules/howler/dist/howler.min.js',
            'node_modules/phaser-ce/build/phaser.min.js'
        ],
        css: [
            'node_modules/animate.css/animate.min.css'
        ]
    },
    js: ['src/assets/js/*.js', 'src/assets/js/**/*.js'],
    entry: './src/assets/js/main.js',
    dist: './dist/assets',
    distcss: './dist/assets/css',
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

gulp.task('copycss', ['clean'], function(cb) {
    pump([gulp.src(paths.libs.css),
        gulp.dest(paths.distcss + '/libs')
    ], cb);
});

gulp.task('concatlibs', ['clean'], function(cb) {
    pump([gulp.src(paths.libs.js),
        concat('libs.js'),
        gulpif(!watching, uglify()),
        gulp.dest(paths.dist + '/js/libs')
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
            entries: [paths.entry],
            debug: watching
        }).transform(babelify, { presets: ['env'] }).bundle(),
        source('main.min.js'),
        jshint('.jshintrc'),
        jshint.reporter('default'),
        buffer(),
        gulpif(!watching, streamify(uglify())),
        rev(),
        gulp.dest(paths.distjs),
        rev.manifest(),
        gulp.dest(paths.distrevjs)
    ], cb);
});

gulp.task('cleansass', ['clean'], function(cb) {
    pump([
        gulp.src(paths.sass),
        sass().on('error', sass.logError),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        gulpif(!watching, cleancss({
            keepSpecialComments: '*',
            removeEmpty: true
        })),
        rename({ basename: 'css', suffix: '.min' }),
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

gulp.task('rev', ['compile', 'cleansass'], function(cb) {
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
        host: '0.0.0.0',
        port: 9000,
        livereload: true
    });
});

gulp.task('watch', function() {
    watching = true;
    return gulp.watch(['./src/index.html', paths.assets, paths.css, paths.sass, paths.js], ['build', 'html']);
});

gulp.task('default', ['connect', 'watch', 'build']);
gulp.task('build', ['clean', 'copy', 'copycss', 'concatlibs', 'compile', 'cleansass', 'htmlmin', 'rev']);