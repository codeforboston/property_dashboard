define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var Search = require('component/search'),
      Properties = require('component/properties'),
      PropertyData = require('component/property_data');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function formatDate(date) {
    if (!date) {
      return '';
    }
    // get the date in local time by pretending it isn't ISO
    date = new Date(date.replace('T', ' '));
    return date.toLocaleDateString();
  }

  function initialize() {
    var SODABaseURI = 'https://data.cityofboston.gov';
    Search.attachTo('#search');
    Properties.attachTo('#properties', {
      SODABaseURI: SODABaseURI
    });
    PropertyData.attachTo('#service_requests', {
      SODABaseURI: SODABaseURI,
      dataset: 'awu8-dc52',
      fields: [{
        name: 'subject'
      }, {
        name: 'reason'
      }, {
        name: 'type'
      }, {
        name: 'case_status',
        display: 'Case Status'
      }, {
        name: 'source'
      }, {
        name: 'open_dt',
        display: 'Open Date'
      }, {
        name: 'closed_dt',
        display: 'Closed Date'
      }],
      formatters: {
        'open_dt': formatDate,
        'closed_dt': formatDate
      }
    });
    PropertyData.attachTo('#code_enforcement', {
      SODABaseURI: SODABaseURI,
      dataset: '8sq6-p7et',
      fields: [{
        name: 'description'
      }, {
        name: 'status'
      }, {
        name: 'status_dttm',
        display: 'Date'
      }],
      formatters: {
        'status_dttm': formatDate
      }
    });
  }

});
