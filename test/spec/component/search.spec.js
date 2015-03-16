'use strict';

describeComponent('component/search', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent(
      '<div><input id="street_number"/><input id="street"/><button/></div>',
      {
        buttonSelector: 'button'
      });
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('clicking buttonSelector should trigger a uiSearchEvent', function() {
    this.$node.find('#street_number').val('number');
    this.$node.find('#street').val('street');
    var spy = spyOnEvent(this.$node, 'uiSearch');

    this.component.select('buttonSelector').click();

    waits(1);
    expect(spy.callCount).toEqual(1);
    expect(spy.calls[0].args[1].search).toEqual({
      'street_number': 'number',
      'street': 'street'
    });
  });

});
