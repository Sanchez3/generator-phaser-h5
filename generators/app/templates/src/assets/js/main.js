/**
 * Created by Sanchez 
 */
'use strict';
var config = {
    width: '100',
    height: '100',
    renderer: Phaser.AUTO,
    parent: 'canvas-wrapper',
    resolution: window.devicePixelRatio,
    transparent: true
}
window.game = new Phaser.Game(config);
window.game.state.add('Boot', require('./states/boot'));
window.game.state.add('Preloader', require('./states/preloader'));
window.game.state.add('State1', require('./states/state1'));
window.game.state.start('Boot');

//Can Use ES6 
const use_e6 = true;

window.h5 = {
    isPc: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    },
    rootResize: function() {
        var wFsize;

        //iphone6/6s/7/8 orientation=portrait screen.width=750px screen.height=1334px / WeChat window.innerWidth=750px window.innerHeight=1206px 
        var wWidth = document.documentElement.clientWidth || window.innerWidth;
        var wHeight = document.documentElement.clientHeight || window.innerHeight;

        if (wWidth > wHeight) {
            wFsize = wHeight / 750 * 100;
        } else {
            wFsize = wWidth / 750 * 100;
        }

        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    },
    eventInit: function() {
        var that = this;
        document.addEventListener('touchstart', function(e) {}, { passive: false });
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        return that;
    },
    cssInit: function() {
        var that = this;
        var noChangeCountToEnd = 100,
            noEndTimeout = 1000;g
        // var body = document.body;
        // var html = document.documentElement;
        // var height = Math.max(
        //     body.offsetHeight,
        //     body.scrollHeight,
        //     html.clientHeight,
        //     html.offsetHeight,
        //     html.scrollHeight
        // );
        // document.getElementsByTagName('html')[0].style.height = height + 'px';
        // document.getElementsByTagName('body')[0].style.height = height + 'px';
        that.rootResize();
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
            var interval,
                timeout,
                end,
                lastInnerWidth,
                lastInnerHeight,
                noChangeCount;
            end = function() {
                //'orientationchangeend'
                clearInterval(interval);
                clearTimeout(timeout);
                interval = null;
                timeout = null;
                that.rootResize();
            };
            interval = setInterval(function() {
                if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                    noChangeCount++;
                    if (noChangeCount === noChangeCountToEnd) {
                        //The interval resolved the issue first.
                        end();
                    }
                } else {
                    lastInnerWidth = window.innerWidth;
                    lastInnerHeight = window.innerHeight;
                    noChangeCount = 0;
                }
            });
            timeout = setTimeout(function() {
                //The timeout happened first.
                end();
            }, noEndTimeout);
        });

        return that;
    },
    init: function() {
        var that = this;
        that.cssInit().eventInit();
    }
};

window.onload = function() {
    window.h5.init();
    showStats();
};



function showStats() {
    var stats = new Stats();
    //0: fps, 1: ms, 2: mb, 3+: custom
    stats.showPanel(0);
    var fs = document.createElement('div');
    fs.style.position = 'absolute';
    fs.style.left = 0;
    fs.style.top = 0;
    fs.style.zIndex = 999;
    fs.appendChild(stats.domElement);
    document.body.appendChild(fs);

    function animate() {
        stats.begin();
        //monitored code goes here
        stats.end();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}