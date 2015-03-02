/*
	Reid Carlberg
	March 1, 2015
	the data-host requests a certain format.

{ D001: 
   { rangeStartDate: 'Mon, 02 Mar 2015 11:20:20 GMT',
     deviceName: 'D001',
     brightness: 0,
     maxBrightness: 0,
     minBrightness: 0,
     temperature: 13.88,
     maxTemperature: 13.88,
     minTemperature: 13.81,
     rangeEndDate: 'Mon, 02 Mar 2015 11:20:34 GMT' },
  D002: 
   { rangeStartDate: 'Mon, 02 Mar 2015 11:20:20 GMT',
     deviceName: 'D002',
     brightness: 0,
     maxBrightness: 0,
     minBrightness: 0,
     temperature: 14.5,
     maxTemperature: 14.5,
     minTemperature: 14.44,
     rangeEndDate: 'Mon, 02 Mar 2015 11:20:34 GMT' } }
*/

var Results = function() {

	this.data = {};

	this.record = function(resultsString) {
		var readings = resultsString.split('|');
		//console.log(readings);
		readings[1] = Number(readings[1]);
		readings[2] = Number(readings[2]);
		if (!this.data[readings[0]]) {
			console.log(readings[0] + " not found");
			this.data[readings[0]] = {};
			this.data[readings[0]].rangeStartDate = new Date().toUTCString();
			this.data[readings[0]].deviceName = readings[0];
			this.data[readings[0]].brightness = readings[1];
			this.data[readings[0]].maxBrightness = readings[1];
			this.data[readings[0]].minBrightness = readings[1];
			this.data[readings[0]].temperature = readings[2];
			this.data[readings[0]].maxTemperature = readings[2];
			this.data[readings[0]].minTemperature = readings[2];
		} else {
			console.log(readings[0] + " found!");
			var currentResult = this.data[readings[0]];
			currentResult.rangeEndDate = new Date().toUTCString();
			currentResult.brightness = readings[1];
			if ( readings[1] < currentResult.minBrightness ) {
				currentResult.minBrightness = readings[1];
			} else if (readings[1] > currentResult.maxBrightness) {
				currentResult.maxBrightness = readings[1];
			}
			currentResult.temperature = readings[2];
			if ( readings[2] < currentResult.minTemperature ) {
				currentResult.minTemperature = readings[2];
			} else if (readings[2] > currentResult.maxTemperature) {
				currentResult.maxTemperature = readings[2];
			}

		}
	}
}

module.exports = Results;

