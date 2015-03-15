define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withSoda;

  /**
   * Module function
   */

  function withSoda() {
    this.attributes({
      SODABaseURI: null
    });

    this.querySODA = function querySODA(dataset, params) {
      params = params || {};
      var data = {
        callback: '?'
      };
      if (params.select) {
        data.$select = params.select.join(',');
      }
      if (params.filter) {
        var key;
        for (key in params.filter) {
          if (params.filter.hasOwnProperty(key)) {
            data[key] = params.filter[key].toString();
          }
        }
      }
      return $.getJSON(
        this.attr.SODABaseURI + '/resource/' + dataset + '.json',
        data);
    };

    this.after('initialize', function () {

    });
  }

});
