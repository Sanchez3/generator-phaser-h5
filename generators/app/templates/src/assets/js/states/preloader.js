/**
 * Created by Sanchez
 */
(function() {
    'use strict';
    var Preloader = function() {};

    module.exports = Preloader;

    Preloader.prototype = {
        loadResources: function() {
            // More detail in Phaser Docs - http://phaser.io/docs/2.6.2/Phaser.Loader.html
            // To add a SpriteSheet to the loader use the following:
            // this.load.spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing);

            // Texture Atlas which the frames are usually variable in size 
            // and come with a json or xml file that describes their structure. Sometimes a Texture Atlas
            // Usually use tools such as TexturePacker and Shoebox to create
            // To add Texture Atlas a the loader use the following:
            // this.load.atlas(key, textureURL, atlasURL, atlasData, format);

            // Video
            // Wechat app can not support 'canplay' 'canplaythrough' 'loadstart' 'loadeddata' 'loadedmetadata'
            // this.load.video(key, urls, loadEvent, asBlob);

            // image
            // this.load.image(key, url, overwrite);
            this.load.start();

        },
        drawPieProgress: function(_progress) {
            var that = this;
            that.pgGraphics.clear();
            that.pgGraphics.lineStyle(6, 0x29ABE2);
            that.pgGraphics.arc(this.game.width / 2, this.game.height / 2, 45, this.game.math.degToRad(270), this.game.math.degToRad(360 * _progress / 100 + 270), false);
            that.pgGraphics.endFill();

        },
        create: function() {
            var that = this;
            that.pgGraphics = this.add.graphics(0, 0);
            var style = {
                fontStyle: 'italic',
                font: 'Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei',
                fontSize: 19,
                fill: '#000',
                align: 'center'
            };
            that.progress = this.add.text(this.game.width / 2, this.game.height / 2 + 5, '0%', style);
            that.progress.anchor.setTo(0.5);
            this.load.onFileComplete.add(that.onfileComplete, this);
            this.load.onLoadComplete.addOnce(that.onLoadComplete, this);
            this.loadResources();

        },
        onLoadComplete: function() {
            var that = this;
            that.game.state.start('State1');
            return;

        },
        onfileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
            var that = this;
            that.drawPieProgress(progress);
            that.progress.text = progress + '%';
        }
    };

}());