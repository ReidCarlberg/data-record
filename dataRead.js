var i2c = require('i2c'),
	MyResults = require('./myResults.js');

var address = 0x18;

var device1 = new i2c(address, {device: '/dev/i2c-1'});
device1.setAddress(0x4);

var device2 = new i2c(address, {device: '/dev/i2c-1'});
device2.setAddress(0x6);

var devices = [ device1, device2 ];

var results = new MyResults();

function handleTimeout() {
	setTimeout(function() { handleRead(); }, 1000 );
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
	handleTimeout();
}


handleTimeout();
