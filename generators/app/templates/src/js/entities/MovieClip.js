/**
 * Created by Sanchez
 */

'use strict';


/*
 视频序列帧播放类         
 @startIndex 开始图片文件序列
 @endIndex 结束图片文件序列      
 @x y width height 视频的位置及宽高
 @frameWidth,frameHeight  序列帧纹理宽高     
 @totalFrames 视频序列帧总帧数
 @frameRate  帧速率 每秒帧数
 @onComplete 播放结束回调
 */


//prefix,startIndex,endIndex,,frameWidth,frameHeight,totalFrames,frameRate


function MovieClip(game, _x, _y, _width, _height, videoConfig, onComplete) {
    this.game = game;
    this.videoConfig = videoConfig;
    this.curentIndex = !!this.videoConfig ? this.videoConfig.getStartIndex() : 0;
    this._x = _x;
    this._y = _y;
    this._width = _width;
    this._height = _height;
    this._pause = false;

    this._scale = this._width / this.videoConfig.frameWidth;
    this.onComplete = onComplete;
    Phaser.Sprite.call(this, this.game, this._x, this._y);
    this.anchor.set(0);
    this.sprite = null;
    return this;
};

MovieClip.prototype = Object.create(Phaser.Sprite.prototype);

MovieClip.prototype.constructor = MovieClip;

MovieClip.prototype.playVideo = function() {


    if (this.sprite == null) {
        this.sprite = this.game.make.sprite(0, 0, this.videoConfig.prefix + this.curentIndex);
        this.addChild(this.sprite);
    } else {
        this.curentIndex = 0;
        this.sprite.loadTexture(this.videoConfig.prefix + this.curentIndex, 0);
    }
    this.anim = this.sprite.animations.add('anim' + this.curentIndex);

    this.anim.onComplete.add(this.onAnimationFinish, this);
    this.sprite.anchor.set(0);
    this.sprite.scale.set(this._scale); //以视频的宽为准
    this.sprite.animations.play('anim' + this.curentIndex, this.videoConfig.frameRate, false);
};

MovieClip.prototype.onAnimationFinish = function(pSender) {
    this.curentIndex++;
    if (this.curentIndex > this.videoConfig.end) {
        if (!!this.onComplete || typeof(this.onComplete) == 'function') {
            this.onComplete();
        }
        return;
    }
    this.sprite.loadTexture(this.videoConfig.prefix + this.curentIndex, 0);
    this.anim = this.sprite.animations.add('anim' + this.curentIndex);
    this.anim.onComplete.add(this.onAnimationFinish, this);
    this.sprite.animations.play('anim' + this.curentIndex, this.videoConfig.frameRate, false);
};


//是否暂停
MovieClip.prototype.isPause = function() {
    return this._pause;
};


//暂停
MovieClip.prototype.pause = function() {
    if (!!this.sprite) {
        this.sprite.animations.stop('anim' + this.curentIndex, false);
        this.curentFrame = this.anim.frame;
        this._pause = true;
    }
};

//停止 恢复首帧
MovieClip.prototype.stop = function() {
    if (!!this.sprite) {
        this.sprite.animations.stop('anim' + this.curentIndex, false);
        this.curentIndex = 0;
        this.sprite.loadTexture(this.videoConfig.prefix + this.curentIndex, 0);
    }
};

//继续播放
MovieClip.prototype.resume = function() {
    if (!!this.sprite) {
        // .currentFrame=this.curentFrame;

        this.sprite.animations.play('anim' + this.curentIndex, this.videoConfig.frameRate, false);
        this.anim.frame = this.curentFrame;
        // console.log("resume");
        this._pause = false;
    }
};


module.exports = MovieClip;
