const express = require('express');
const http = require('http');
const router = express.Router();

let Status = require('../model/humidifier.js');

const Humid_Control_Url = require('../urlModel/humidifier_Url');

router.get('/power', (req, res, next) => {

	console.log('Humid_PowerOn');
	Humid_Control_Url.path += Status.control.power;
	console.log(Status.control.power);

	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
});

router.get('/mist', (req, res, next) =>{
	console.log('mist On');
	Humid_Control_Url.path += Status.control.humid;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
});

router.get('/humidity', (req, res, next) =>{
	console.log('Humidity');
	Humid_Control_Url.path += Status.control.speed;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
});

module.exports = router;



