const gpio = require('gpio');
const eddystone = require('eddystone-beacon');
const s3o = require('s3o-middleware');
const env = require('dotenv').config();
const denodeify = require('denodeify');
const dnsLookup = denodeify( require('dns').lookup );

const localIP = dnsLookup(require('os').hostname())
	.then( IP => {
		console.log(`${IP}:${process.env.PORT}`);
		return `${IP}:${process.env.PORT}`;
	})
;