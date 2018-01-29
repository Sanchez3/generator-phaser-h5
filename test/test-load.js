/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');

describe('yo:phaser-h5', function () {
  it('can be imported without blowing up', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });
});
