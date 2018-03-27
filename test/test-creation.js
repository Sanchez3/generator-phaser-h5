/*yeoman-test*/
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const fsextra = require('fs-extra');
const path = require('path');

const basedir = path.join(__dirname, '../generators/app');

describe('yo:phaser-h5', () => {

    let tmpdir;

    beforeEach(() => {
        return helpers.run(basedir)
            .inTmpDir(dir => {
                tmpdir = dir;
            })
            .withOptions({ projectName: 'temp' }, { projectDesc: ' ' }, { projectLicense: 'MIT' }, { projectSass: true });
    });

    afterEach(() => fsextra.remove(tmpdir));

    it('creates expected files', () => {

        const expected = [
            // add files you expect to exist here.
            'gulpfile.js',
            '.jshintrc',
            'src/assets/css/sass.scss',
            'src/index.html',
            'package.json',
            'src/assets/js/main.js',
            'src/assets/js/entities/Gesture.js',
            'src/assets/js/entities/MovieClip.js',
            'src/assets/js/entities/VideoConfig.js',
            'src/assets/js/states/boot.js',
            'src/assets/js/states/state1.js',
            'src/assets/js/states/preloader.js'
        ];

        const files = expected.map(i => path.join(tmpdir, i));
        assert.file(files);
    });
});