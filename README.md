# ng-slide-animations
Minimal angular.js implementation of slide-to-side animations

# What is it?
It is angular.js module implementing simplest CSS transition-based slide animations. It is free of specific for jQuery methods, totally capable to run with embedded jqLite.

# What can this do?
This module handles computing start and end values of animating property together with applying them correctly and reporting transition end.

# What can NOT this do?
This module is not intended to deal with any javascript-based animations, compute intermediate values, control animation process or handle any complex animation behavior. Also, CSS *animations* (not *transitions*!) currently are not supported.
    
# How can I use it?
This module defines single factory object with methods executing CSS transitions on ane element (with optional `done` callback).

Since this module only cares about start and end of the transtion, you must provide a CSS rule describing a transition of `height`/`width` explicitly for the element in interest. Once CSS transition is defined, you can call animation functions directly or use them in describing angular animations.

Note that you will probably need extra `overflow: hidden` for the element in transition.

# Example
Slide down/up an element when adding/removing to DOM. This example uses `ngAnimate` to incorporate this behavior with standart angular directives such as `ngIf` or `ngRepeat`

1. Define a CSS transition
```CSS
.slide-down {
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
  overflow-y: hidden;
}
```

2. Define an animation with `enter` and `leave` events
```javascript
angular.module('slideDown', ['ngAnimate', 'ngSlideAnimations']).animation('.slide-down',
    ['slideAnimations', function(slideAnimations){
      return {
        enter: slideAnimations.down,
        leave: slideAnimations.up
      }
    }]);
```

3. Use marker class with DOM-modifying directive
```HTML
<div class="slide-down" ng-if="your.condition">I will appear from top to bottom</div>
```