/**
 * A simple script for scrollable fixed menu bar
 * @author: Alexandre Oger
 */
 
var scrollilol = (function(window) {

    var elt,
        currentPosition,
        prevPosition = startOffset = 0,
        throttleRate = 250;

    var getScrollObject = function(_elementId) {
        elt = document.getElementById(_elementId);
        if(elt !== null) {
            return true;
        }
        return false;
    };

    var listenScroll = function() {
        try {
            window.addEventListener('scroll', throttle(function() {
                scrollController();
            }, throttleRate), false);
            return true;
        } catch(e) {
            return false;
        }
    };

    var hasClass = function(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    var scrollController = function() {
        getCurrentPosition();
        //elt.classList not available in "old" browsers : http://caniuse.com/classlist
        if(window.pageXOffset === 0 && currentPosition > startOffset && prevPosition < currentPosition && currentPosition > 0) {
            if(!hasClass(elt,"hideit")) {
                elt.className += " hideit";
            }
        } else if(currentPosition > startOffset && currentPosition < document.body.clientHeight - window.innerHeight) {
            if(hasClass(elt,"hideit")) {
                elt.className = elt.className.replace(new RegExp('(\\s|^)hideit(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
            }
        }
        prevPosition = currentPosition;
    };

    var getCurrentPosition = function() {
        currentPosition = window.pageYOffset;
    };

    // http://remysharp.com/2010/07/21/throttling-function-calls/
    var throttle = function(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;
            var now = +new Date,
               args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    return {
        init: function(_elementId = 'scrollilol', _startOffset = 0, _throttleRate = 100) {
            startOffset = _startOffset;
            throttleRate = _throttleRate;
            
            getScrollObject(_elementId) || console.log('Scrollilol : error >> element Id not found');
            listenScroll() || console.log('Scrollilol : error >> can\'t listenning the element');
        }
    };
})(window);
 
scrollilol.init();
