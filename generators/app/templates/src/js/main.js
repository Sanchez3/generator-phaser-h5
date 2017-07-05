/**
 * Created by sanchez 
 */
'use strict';
window.game = new Phaser.Game(1334, 636, Phaser.CANVAS, 'mycanvas', null, true);
window.game.state.add('Boot', require('./states/boot'));
window.game.state.add('Preloader', require('./states/preloader'));
window.game.state.add('State1', require('./states/state1'));
window.game.state.start('Boot');
window.vcanplay = false;
window.successFlag = false;
window.mp = {
    rootResize: function() {
        var that = this;
        var Dpr = 1,
            uAgent = window.navigator.userAgent;
        var isIOS = uAgent.match(/iphone/i);
        var isYIXIN = uAgent.match(/yixin/i);
        var is2345 = uAgent.match(/Mb2345/i);
        var ishaosou = uAgent.match(/mso_app/i);
        var isSogou = uAgent.match(/sogoumobilebrowser/ig);
        var isLiebao = uAgent.match(/liebaofast/i);
        var isGnbr = uAgent.match(/GNBR/i);
        var isWeixin = uAgent.match(/MicroMessenger/i);
        var wFsize;
        var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
            window.innerWidth : window.innerWidth;
        var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
            screen.height : window.innerHeight : window.innerHeight;


        if (isIOS) {
            wWidth = screen.width;
            wHeight = screen.height;
        }
        // if(window.orientation==90||window.orientation==-90){
        //     wWidth = wHeight;
        // }else if((window.orientation==180||window.orientation==0)){
        // }
        if (wWidth > wHeight) {
            wHeight = wWidth;
        }
        wFsize = wHeight / 13.34;
        if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr || isWeixin) { //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
            setTimeout(function() {
                // var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                // var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                // wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ?
                //     screen.width : window.innerWidth : window.innerWidth;
                wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                // wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
                //     screen.height : window.innerHeight : window.innerHeight;

                // alert(wHeight + '    ' + wWidth);
                if (wWidth > wHeight) {
                    wHeight = wWidth;
                }

                wFsize = wHeight / 13.34;
                // wFsize = wFsize > 32 ? wFsize : 32;

                document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';

            }, 500);
        } else {
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        }
        // alert(wWidth + ' ' + wHeight);
        // alert(window.navigator.userAgent);

        return that;

    },
    eventInit: function() {
        var that = this;

        document.addEventListener('touchstart', function(e) {}, false);
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        return that;

    },
    cssInit: function() {
        var that = this;



        that.rootResize();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {

            if (window.orientation == 90 || window.orientation == -90) {
                //横屏
                // alert('a');
                //_.renderShuping();
                that.rootResize();
                // var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                // var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                // var maxW;
                // if (wh > ww) { maxW = wh; } else { maxW = ww; }
                // document.documentElement.style.fontSize = maxW / 13.34 + 'px';
            } else {
                //竖屏
                //_.closeShuping();
            }

        }, false);
        return that;
    }
};
window.mp.cssInit().eventInit();
