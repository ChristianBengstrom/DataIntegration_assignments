'use strict';
/**
 * nQuery, *the* JS Framework
 */
var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}
var $c= (foo) => {
  return document.getElementsByClassName(foo);
};
