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
                .then(checkAssets)
                .then(checkConfig)
                .then(checkScripts)
        });

        function checkConfig() {
            assert.file([
                'gulpfile.js',
                'package.json',
                '.jshintrc'
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
                'README.md',
                'LICENSE',
                'src/assets/css/css.css',
                'src/assets/img/favicon.ico'
            ]);
        }
    });
    describe('using options', () => {
        it('projectName, projectDesc', () => {
            helpers.run(basedir)
                .withOptions({ projectName: name, projectDesc: description })
                .then(() => {
                    assert.fileContent([
                        ['package.json', `"name": ${JSON.stringify(name)}`],
                        ['package.json', `"description": ${JSON.stringify(description)}`]
                    ]);
                    assert.fileContent([
                        ['README.md', `# ${name}`],
                        ['README.md', `${description}`]
                    ]);
                })
        });
        it('projectLicense: MIT', () => {
            helpers.run(basedir)
                .withPrompts({ projectLicense: 'MIT' })
                .then(() => {
                    assert.file([
                        'LICENSE'
                    ]);
                })
        });
        it('projectLicense: Apache-2.0', () => {
            helpers.run(basedir)
                .withPrompts({ projectLicense: 'Apache-2.0' })
                .then(() => {
                    assert.file([
                        'LICENSE'
                    ]);
                })
        });
        it('projectLicense: GPL-3.0', () => {
            helpers.run(basedir)
                .withPrompts({ projectLicense: 'GPL-3.0' })
                .then(() => {
                    assert.file([
                        'LICENSE'
                    ]);
                })
        });
        it('projectLicense: Others', () => {
            helpers.run(basedir)
                .withPrompts({ projectLicense: 'Others' })
                .then(() => {
                    assert.file([
                        'LICENSE'
                    ]);
                })
        });
        it('projectSass: true', () => {
            helpers.run(basedir)
                .withPrompts({ projectSass: true })
                .then(() => {
                    assert.file([
                        'src/assets/css/sass.scss',
                        'gulpfile.js',
                        'package.json'
                    ]);
                })
        });
    });


});