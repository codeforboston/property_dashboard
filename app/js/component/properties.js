define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component'),
      withRenderTable = require('component/with_render_table'),
      withSODA = require('component/with_SODA');

  /**
   * Module exports
   */

  return defineComponent(withRenderTable, withSODA, properties);

  /**
   * Module function
   */

  function properties() {
    this.attributes({
      dataset: 't85d-b449',
      fields: [{
        name: 'property_id',
        display: 'Property ID'
      }, {
        name: 'location'
      }, {
        name: 'unit'
      }]
    });

    this.onSearch = function(ev, data) {
      this.querySODA(this.attr.dataset, {
        select: this.fieldNames(),
        filter: {
          'p_streetnumber': data.search.streetNumber,
          'p_streetname': data.search.street
        }
      }).then(this.setData.bind(this));
    };

    this.after('render', function() {
      if (this.data) {
        this.trigger('properties', {
          properties: this.data
        });
      }
    });

    this.after('initialize', function () {
      this.on(document, 'uiSearch', this.onSearch);
    });
  }

});
