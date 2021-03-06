'use strict';

describeMixin('component/with_render_table', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent('<div><table></table></div>', {
      tableSelector: 'table',
      fields: [{
        name: 'name',
        display: 'Display'
      }, {
        name: 'date',
        display: 'Date'
      }, {
        name: 'nodisplay'
      }],
      formatters: {
        date: function(value) {
          return 'formatted value';
        }
      }
    });
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('#fieldNames should return the names of the fields', function() {
    expect(this.component.fieldNames()).toEqual(
      ['name', 'date', 'nodisplay']);
  });

  it('should render the headers', function() {
    var $headers = this.$node.find('th'),
        headerDisplays = $headers.map(function(index, el) {
          return el.innerText;
        }).toArray();

    expect(headerDisplays).toEqual(['Display', 'Date', 'Nodisplay']);
  });

  it('should render data/formatted data', function() {
    this.component.setData([{
      name: 'name value',
      date: 'date value'
    }]);
    var $values = this.$node.find('td'),
        valueDisplays = $values.map(function(index, el) {
          return el.innerText;
        }).toArray();

    expect(valueDisplays).toEqual(['name value', 'formatted value', '']);
  });

  it('can render multiple sets of data', function() {
    this.component.setData([{
      name: 'name value',
      date: 'date value'
    }, {
      name: 'name 2',
      date: 'date 2'
    }]);

    expect(this.$node.find('tr').length).toEqual(3); // header + 2 rows
    expect(this.$node.find('td').length).toEqual(6); // 2 rows * 3 values
  });
});
