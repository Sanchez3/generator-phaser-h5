/**
 * Created by sanchez
 */
(function() {
    'use strict';
    var State1 = function() {};
    module.exports = State1;
    State1.prototype = {
        preload: function() {},
        create: function() {
            var text = "- phaser -\n with a sprinkle of \n pixi dust.";
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var t = this.add.text(this.width / 2 - 300, 0, text, style);

        },
        update: function() {}

    };

}());