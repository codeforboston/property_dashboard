define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(search);

  /**
   * Module function
   */

  function search() {
    this.attributes({
      buttonSelector: 'button'
    });

    this.val = function val() {
      var values = {};
      this.$node.find('input').each(function(index, el) {
        values[el.id] = el.value;
      });
      return values;
    };

    this.onSubmit = function onSubmit(ev) {
      if (ev) { ev.preventDefault(); }

      this.trigger('uiSearch', {
        search: this.val()
      });
    };

    this.after('initialize', function () {
      this.on('click', {
        buttonSelector: this.onSubmit
      });
      // submit the initial value
      window.setTimeout(this.onSubmit.bind(this), 100);
    });
  }

});
