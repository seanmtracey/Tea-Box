const gpio = require('gpio');
const eddystone = require('eddystone-beacon');
const s3o = require('s3o-middleware');
const env = require('dotenv').config();
const denodeify = require('denodeify');
const dnsLookup = denodeify( require('dns').lookup );

const localIP = dnsLookup(require('os').hostname())
	.then( IP => {
		const addressWithPort = `${IP}:${process.env.PORT}`;
		console.log(addressWithPort);
		eddystone.advertiseUrl(`http://${addressWithPort}`, {
			txPowerLevel: -22,
			tlmCount: 2,
			tlmPeriod: 10
		});	
		return addressWithPort;
	})
;