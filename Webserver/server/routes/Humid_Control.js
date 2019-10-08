const express = require('express');
const http = require('http');
const router = express.Router();

let Status = require('../model/humidifier.js');


const Humid_Control_Url = require('../urlModel/humidifierUrl');

const aa = {};

router.get('/power', (req, res, next) => {

	console.log('Humid_PowerOn');
	Humid_Control_Url.path += Status.control.ctrlpower;
	console.log(Status.control.ctrlpower);

	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify(aa));
});

router.get('/mist', (req, res, next) =>{
	console.log('mist On');
	Humid_Control_Url.path += Status.control.ctrlhumid;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify(aa));
});

router.get('/humidity', (req, res, next) =>{
	console.log('Humidity');
	Humid_Control_Url.path += Status.control.ctrlspeed;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify(aa));
});

module.exports = router;



