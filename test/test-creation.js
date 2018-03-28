/*yeoman-test*/
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const fsextra = require('fs-extra');
const path = require('path');

const basedir = path.join(__dirname, '../generators/app');
const name = 'test projectName';
const description = 'test projectDesc';

describe('generator-phaser-h5', () => {
    describe('defaults', () => {
        it('creates expected files', () => {
            helpers.run(basedir)
                .withPrompts({ projectName: name, projectDesc: description, projectLicense: 'MIT', projectSass: true })
                .then(checkAssets)
                .then(checkConfig)
                .then(checkReadme)
                .then(checkScripts)
        });

        function checkConfig() {
            assert.file([
                'gulpfile.js',
                '.jshintrc'
            ]);
            assert.fileContent([
                ['package.json', `"name": ${name}`],
                ['package.json', `"description": ${description}`]
            ]);
        }

        function checkReadme() {
            assert.fileContent([
                ['README.md', `# ${name}`],
                ['README.md', `${description}`]
            ]);
        }

        function checkScripts() {
            assert.file([
                'src/assets/js/main.js',
                'src/assets/js/entities/Gesture.js',
                'src/assets/js/entities/MovieClip.js',
                'src/assets/js/entities/VideoConfig.js',
                'src/assets/js/states/boot.js',
                'src/assets/js/states/state1.js',
                'src/assets/js/states/preloader.js'
            ]);
        }

        function checkAssets() {
            assert.file([
                'src/index.html',
                'LICENSE',
                'src/assets/css/sass.scss',
                'src/assets/img/favicon.ico'
            ]);
        }
    });
    // describe('using options', () => {
    //     let tmpdir;
    //     beforeEach(() => {
    //         return helpers.run(basedir)
    //             .inTmpDir(dir => {
    //                 tmpdir = dir;
    //             })
    //             .withPrompts({ projectName: name, projectDesc: description, projectLicense: 'MIT', projectSass: true });
    //     });

    //     afterEach(() => fsextra.remove(tmpdir));

    //     function checkConfig() {
    //         assert.file([
    //             'gulpfile.js',
    //             '.jshintrc'
    //         ]);
    //         assert.fileContent([
    //             ['package.json', `"name": ${name}`],
    //             ['package.json', `"description": ${description}`]
    //         ]);
    //     }

    //     function checkReadme() {
    //         assert.fileContent([
    //             ['README.md', `# ${name}`],
    //             ['README.md', `${description}`]
    //         ]);
    //     }

    //     function checkScripts() {
    //         assert.file([
    //             'src/assets/js/main.js',
    //             'src/assets/js/entities/Gesture.js',
    //             'src/assets/js/entities/MovieClip.js',
    //             'src/assets/js/entities/VideoConfig.js',
    //             'src/assets/js/states/boot.js',
    //             'src/assets/js/states/state1.js',
    //             'src/assets/js/states/preloader.js'
    //         ]);
    //     }

    //     function checkAssets() {
    //         // const expected = [
    //         //     'src/index.html',
    //         //     'src/LICENSE',
    //         //     'src/assets/css/sass.scss',
    //         //     'src/assets/img/favicon.ico'
    //         // ];
    //         // const files = expected.map(i => path.join(tmpdir, i));
    //         assert.file([
    //             'src/index.html',
    //             'LICENSE',
    //             'src/assets/css/sass.scss',
    //             'src/assets/img/favicon.ico'
    //         ]);
    //     }
    //     it('creates expected files', () => {
    //         checkAssets();
    //         checkConfig();
    //         checkReadme();
    //         checkScripts();
    //     });

    // });


});