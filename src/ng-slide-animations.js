angular.module('ngSlideAnimations', ['ngAnimate']).factory('slideAnimations', ['$window', function($window){
  var transitionProperty = getPrefixed('transitionProperty');
  var transitionDuration = getPrefixed('transitionDuration')

  var CURRENT = 'current';

  function getPrefixed(prop){
    //based on https://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr#answer-13081497
    var style = $document[0].createElement('p').style, prefixes = ['ms', 'O', 'Moz', 'Webkit'];
    if(style[prop] == '')
      return prop;
    prop = prop.charAt(0).toUpperCase() + prop.substr(1);
    for (var i = prefixes.length; i--;)
      if(typeof (style[prefixes[i] + prop]) === 'string')
        return (prefixes[i] + prop);
  }

  function animateSizeAndReset(element, dimension, from, to, done){
    if(hasTransition(element, dimension)){
      if(from == CURRENT)
        from = currentSize(element, dimension);
      if(to == CURRENT)
        to = currentSize(element, dimension);
      var oldSize = element[0].style[dimension];
      var oldDisplay = element[0].style.display;
      element.css('display', 'none').css(dimension, from);
      installSizeTransitionFinisher(forceRepaint(element), dimension, oldSize, done);
      forceRepaint(element.css('display', oldDisplay)).css(dimension, to);
    }else{
      done && done();
    }
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
        done && done();
      }
    });
  }

  function hasTransition(element, property){
    var style = $window.getComputedStyle(element[0]);
    var propList = style[transitionProperty];
    if(propList != '' && propList != 'none' && (propList === 'all' || !!~propList.split(/\s*,\s*/).indexOf(property))){
      return parseFloat(style[transitionDuration]) > 0;
    }else
      return false;
  }

  function forceRepaint(element){
    element[0].offsetHeight;
    return element;
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