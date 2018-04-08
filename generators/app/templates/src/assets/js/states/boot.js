(function() {
    'use strict';


    var Boot = function() {};

    module.exports = Boot;

    Boot.prototype = {
        preload: function() {
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
        },

        create: function() {
            var that = this;
            // configure game
            this.game.input.maxPointers = 1;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.stage.disableVisibilityChange = true;

            // this.scale.setUserScale(window.innerWidth / 750, window.innerWidth / 750, 0, 0);
            // if (this.game.device.desktop) {
            //     this.game.scale.pageAlignHorizontally = true;
            // } else {
            //
            //
            //     if(!window.android){
            //         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //         // this.scale.pageAlignHorizontally = true;
            //         // this.scale.pageAlignVertically = true;
            //     }else {
            //         this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            //         this.scale.setUserScale(window.innerWidth/750,window.innerWidth/750,0,0);
            //     }
            // }
            this.game.state.start('Preloader');
        }

    };

}());