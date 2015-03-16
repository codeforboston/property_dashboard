define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withRenderTable;

  /**
   * Module function
   */

  function withRenderTable() {
    this.attributes({
      tableSelector: 'table',
      fields: function() { return []; },
      formatters: function() { return {}; }
    });

    this.formatField = function formatField(field, value) {
      if (this.attr.formatters[field]) {
        value = this.attr.formatters[field](value);
      } else if (typeof value === 'undefined') {
        value = '';
      }
      return value;
    };

    this.render = function render() {
      var $table = this.select('tableSelector');
      $table.html(this.content());
    };

    this.content = function content() {
      var output = [],
          columns = [];
      function appendRow(columns) {
        output.push('<tr>' + columns.join('') + '</tr>');
      }
      this.attr.fields.forEach(function(field) {
        columns.push('<th>' + field.display + '</th>');
      });
      appendRow(columns);
      this.data.forEach(function(row) {
        columns = [];
        this.attr.fields.forEach(function(field) {
          var value = row[field.name];
          columns.push(
            '<td>' + this.formatField(field.name, value) + '</td>');
        }, this);
        appendRow(columns);
      }, this);
      return output;
    };

    this.setData = function setData(data) {
      this.data = data;
      this.render();
    };

    this.after('initialize', function () {
      this.setData([]);
    });
  }

});
