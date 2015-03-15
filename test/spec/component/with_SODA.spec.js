'use strict';

describeMixin('component/with_SODA', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent({
      SODABaseURI: 'http://example.com'
    });
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  describe('#querySODA', function() {
    beforeEach(function() {
      spyOn($, 'ajax').andReturn('promise');
    });

    describe('basic request', function() {
      beforeEach(function() {
        this.returnValue = this.component.querySODA('abcd-1234');
      });

      it('makes a JSON request', function() {
        expect($.ajax).toHaveBeenCalled();
      });

      it('requests data from the SODABaseURI', function() {
        expect($.ajax.calls[0].args[0].url).toMatch(
          new RegExp('^' + this.component.attr.SODABaseURI));
      });

      it('requests the given dataset', function() {
        expect($.ajax.calls[0].args[0].url).toMatch(
            /\/resource\/abcd-1234\.json/);
      });

      it('returns the AJAX promise', function() {
        expect(this.returnValue).toEqual('promise');
      });
    });

    describe('selecting fields', function() {
      it('includes them as $select in the data', function() {
        this.component.querySODA('abcd-1234', {
          select: ['a', 'b AS c']
        });
        expect($.ajax.calls[0].args[0].data.$select).toEqual(
          'a,b AS c');
      });
    });

    describe('basic filtering', function() {
      it('included as individual attributes', function() {
        this.component.querySODA('abcd-1234', {
          filter: {
            a: 'b',
            c: 1
          }
        });
        expect($.ajax.calls[0].args[0].data.a).toEqual('b');
        expect($.ajax.calls[0].args[0].data.c).toEqual('1');
      });
    });

    describe('complex filtering', function() {
      it('included as the $where attribute', function() {
        this.component.querySODA('abcd-1234', {
          where: 'a > b'
        });
        expect($.ajax.calls[0].args[0].data.$where).toEqual('a > b');
      });
    });
  });
});
