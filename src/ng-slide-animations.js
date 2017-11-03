angular.module('slideAnimations', ['ngAnimate']).factory('slideAnimations', ['$window', function($window){

  var CURRENT = 'current';
  function animateSizeAndReset(element, dimension, from, to, done){
    var oldSize = element[0].style[dimension];
    if(from == CURRENT)
      from = currentSize(element, dimension);
    if(to == CURRENT)
      to = currentSize(element, dimension);
    element.css(dimension, from);
    element[0].offsetHeight; //force repaint
    element.css(dimension, to);
    installSizeTransitionFinisher(element, dimension, oldSize, done);
  }

  function currentSize(element, dimension){
    var cssSize = $window.getComputedStyle(element[0])[dimension];
    return isNaN(parseFloat(cssSize)) ? element[0].getBoundingClientRect()[dimension] + 'px' : cssSize;
  }

  function installSizeTransitionFinisher(element, dimension, oldSize, done){
    element.on('transitionend', function finisher(e){
      if(e.propertyName == dimension || !e.propertyName){
        element.off('transitionend', finisher);
        element.css(dimension, oldSize);
        done();
      }
    });
  }

  return {
    down: function(element, done){
      animateSizeAndReset(element, 'height', 0, CURRENT, done);
    },
    up: function(element, done){
      animateSizeAndReset(element, 'height', CURRENT, 0, done);
    },
    right: function(element, done){
      animateSizeAndReset(element, 'width', 0, CURRENT, done);
    },
    left: function(element, done){
      animateSizeAndReset(element, 'width', CURRENT, 0, done);
    }
  }

}]);