'use strict';
var assert = require('assert');

describe('install:generator-phaser-h5', function() {
    it('can be imported without blowing up', function() {
        var app = require('../generators/app');
        assert(app !== undefined);
    });
});