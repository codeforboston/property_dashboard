'use strict';

describeComponent('component/properties', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent({
      SODABaseURI: 'https://example.com'
    });
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should do something');

});
