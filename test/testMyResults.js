/*
	test
*/

var MyResults = require("../myResults.js");

var assert = require("assert");

describe("testing", function(){
  describe('#indexOf()', function(){
    it('should be true and pass', function(){
      //assert.equal(expected, actual);
      assert.equal(true, true );
    });
  });
  describe('MyResults', function() {
  	it('MyResults should aggregate data', function() {
  	   var results = new MyResults();
  	   assert.equal(results.data['Something'], undefined);
  	   results.record('D00A|010| 15.0');
  	   assert.equal(results.data['D00A'].brightness, 10);
  	   assert.equal(results.data['D00A'].maxBrightness, 10);
  	   assert.equal(results.data['D00A'].minBrightness, 10);
  	   assert.equal(results.data['D00A'].temperature, 15.0);
  	   assert.equal(results.data['D00A'].maxTemperature, 15.0);
  	   assert.equal(results.data['D00A'].minTemperature, 15.0);

  	   results.record('D00A|09| 14.0');
  	   assert.equal(results.data['D00A'].brightness, 9);
  	   assert.equal(results.data['D00A'].maxBrightness, 10);
  	   assert.equal(results.data['D00A'].minBrightness, 9);
  	   assert.equal(results.data['D00A'].temperature, 14.0);
  	   assert.equal(results.data['D00A'].maxTemperature, 15.0);
  	   assert.equal(results.data['D00A'].minTemperature, 14.0);

  	   results.record('D00A|11| 16.0');
  	   assert.equal(results.data['D00A'].brightness, 11);
  	   assert.equal(results.data['D00A'].maxBrightness, 11);
  	   assert.equal(results.data['D00A'].minBrightness, 9);
  	   assert.equal(results.data['D00A'].temperature, 16.0);
  	   assert.equal(results.data['D00A'].maxTemperature, 16.0);
  	   assert.equal(results.data['D00A'].minTemperature, 14.0);

  	});
  });
});