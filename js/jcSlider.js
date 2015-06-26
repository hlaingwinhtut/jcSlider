/**
 * A responsive slider jQuery plugin with CSS animations
 *
 * @copyright Copyright 2013-2015 Joan claret
 * @license   MIT
 * @author    Joan Claret Teruel <dpam23 at gmail dot com>
 * @version   0.0.3
 *
 * Licensed under The MIT License (MIT).
 * Copyright (c) Joan Claret Teruel <dpam23 at gmail dot com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


;(function($, document, window, undefined) {

    "use strict";

    $.fn.jcSlider = function(options) {

        var $this = $(this);

        // hide all items excepting first
        $this.find('.jc-animation:not(:first)').hide();

        // get settings
        var settings = $.extend({
            // default settings
            animationIn: "bounceInRight",
            animationOut: "bounceOutLeft",
            stopOnHover: true
        }, options );

        var animateOut = 'animated ' + settings.animationOut;
        var animateIn =  'animated ' + settings.animationIn;
        var animationItem = $this.find('.jc-animation');
        var animationItemsLength = animationItem.length;
        var animationCurrentItem = 0;
        var jcSliderInterval = '';


        // Detect when animations (keyframes) end
        function whichAnimationEvent(){
          var t,
              el = document.createElement("fakeelement");

          var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
          };

          for (t in animations){
            if (el.style[t] !== undefined){
              return animations[t];
            }
          }
        }
        var animationEvent = whichAnimationEvent();


        // main function
        var jcSliderAnimation = function(){

            jcSliderInterval = setInterval(function() { 

                animationItem.eq(animationCurrentItem)
                .removeClass(animateIn) // reset enter animation
                .addClass(animateOut)   // exit animation
                
                // when exit animation is finished, move next item
               .one(animationEvent,

                    function () {

                        // move current item
                        animationItem.eq(animationCurrentItem)
                        .removeClass(animateOut) // reset exit animation
                        .hide();      // hide

                        // select next item
                        animationCurrentItem ++;
                        if (animationCurrentItem == animationItemsLength){
                            animationCurrentItem = 0;
                        }

                        // move next item
                        animationItem.eq(animationCurrentItem)
                        .show() // show
                        .addClass(animateIn);  // next item animation

                    });

            },  4000);
        };

        // Initialise the testimonial animation function
        jcSliderAnimation(); 

        if(settings.stopOnHover === true){

            // Stop the animation on hover
            $this.hover(
                function(){ 
                    
                        clearInterval(jcSliderInterval);
                },
                function(){
                    jcSliderAnimation();
            });
        }
        
    };

})(window.jQuery || window.Zepto || window.$, document, window);

// Pending Zepto support