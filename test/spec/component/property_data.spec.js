'use strict';

describeComponent('component/property_data', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent({
      SODABaseURI: 'baseURI',
      dataset: 'dataset'
    });
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should do something');

});
