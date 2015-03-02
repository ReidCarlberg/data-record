var i2c = require('i2c'),
	MyResults = require('./myResults.js'),
	request = require('request');

var address = 0x18;

var sampleSize = 60; // number of samples to take before sending to host
var currentSampleCount = 0;
var samplePeriod = 10000; // milliseconds between polling for samples

//var url = 'http://192.168.1.10:5000/report';
var url = 'https://nameless-brushlands-6436.herokuapp.com/report';

var device1 = new i2c(address, {device: '/dev/i2c-1'});
device1.setAddress(0x4);

var device2 = new i2c(address, {device: '/dev/i2c-1'});
device2.setAddress(0x6);

var devices = [ device1, device2 ];

var results = new MyResults();

function handleTimeout() {
	setTimeout(function() { handleRead(); }, samplePeriod );
}

function handleRead() {
	that = this;
	for (i = 0; i < devices.length; i++) {
		devices[i].readBytes(null,15, function(err,res) {
			res = res.toString('ascii');
			results.record(res);
		});
		console.log(results.data);
	}

	if (currentSampleCount == sampleSize) {
		//send to host
		request( { method: 'POST', uri: url, 
			json: true, body: results.data } , 
			function() {
				console.log('Reported');
				results.data = {};
				currentSampleCount = 0;
			});
		//initialize
	} else {
		currentSampleCount++;
	}

	handleTimeout();
}


handleTimeout();
