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

    this.fieldNames = function fieldNames() {
      var fields = [];
      this.attr.fields.forEach(function(field) {
        fields.push(field.name);
      });
      return fields;
    };

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

    this.fieldDisplay = function fieldDisplay(field) {
        var display = field.display || (
          field.name[0].toUpperCase() + field.name.slice(1));
        return display;
    };

    this.content = function content() {
      var output = [],
          columns = [];
      function appendRow(columns) {
        output.push('<tr>' + columns.join('') + '</tr>');
      }
      this.attr.fields.forEach(function(field) {
        columns.push('<th>' + this.fieldDisplay(field) + '</th>');
      }, this);

      output.push('<thead>');
      appendRow(columns);
      output.push('</thead><tbody>')

      this.data.forEach(function(row) {
        columns = [];
        this.attr.fields.forEach(function(field) {
          var value = row[field.name];
          columns.push(
            '<td><dfn>' + this.fieldDisplay(field) + '</dfn>' + this.formatField(field.name, value) + '</td>');
        }, this);
        appendRow(columns);
      }, this);
      output.push('</tbody>');

      return output.join('');
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
