define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var Search = require('component/search');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    Search.attachTo('#search');
  }

});
