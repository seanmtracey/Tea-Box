const os = require('os');
const gpio = require('rpi-gpio');
const eddystone = require('eddystone-beacon');
const s3o = require('s3o-middleware');
const env = require('dotenv').config();
const denodeify = require('denodeify');
const networkIP = os.networkInterfaces().wlan0[0].address;
const express = require('express');
var app = express();
app.listen(process.env.PORT);

const solenoidPin = 7;
gpio.setup(solenoidPin, gpio.DIR_OUT, function(err){ console.log('GPIO Error: ' + err) } );

const addressWithPort = networkIP + ':' + process.env.PORT;
console.log(addressWithPort);

eddystone.advertiseUrl('http://' + addressWithPort + '/', {
	txPowerLevel: -22,
	tlmCount: 2,
	tlmPeriod: 10
});	

function closeTheBox(attempt){
	
	attempt = attempt || 0;
	
	gpio.write(solenoidPin, false, function(err){
		
		if(err !== undefined && attempt < 5){
			closeTheBox(attempt += 1);
		}
		
	});
}

function openTheBox(duration, attempt){
	
	attempt = attempt || 0;
	
	gpio.write(solenoidPin, true, function(err){
		
		if(err !== undefined){
			console.log('An error occurred when setting the solenoidPin to HIGH', err);
			if(attempt < 5){
				openTheBox(duration, attempt += 1);
			}	
		}
		
	});
	
	setTimeout(function(){
		closeTheBox();
	}, duration);
		
}

app.use(s3o);

app.get('/', function(req, res) {
	openTheBox(5000);
	res.send('You can haz tea.');
});