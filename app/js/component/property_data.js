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

  return defineComponent(withRenderTable, withSODA, propertyData);

  /**
   * Module function
   */

  function propertyData() {
    this.attributes({
      dataset: null
    });
    this.onProperties = function onProperties(ev, data) {
      var propertyIds = [];
      data.properties.forEach(function(property) {
        propertyIds.push(property.property_id);
      });
      this.querySODA(this.attr.dataset, {
        select: this.fieldNames(),
        where: 'property_id=\'' + propertyIds.join('\' OR property_id=\'') + '\''
      }).then(this.setData.bind(this));
    };

    this.after('initialize', function () {
      this.on(document, 'properties', this.onProperties);
    });
  }

});
