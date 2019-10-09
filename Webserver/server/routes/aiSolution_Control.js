const express = require('express');
const http = require('http');
const router = express.Router();


let aiSolution_Status = require('../model/aiSolution.js');

const humidifier = require('../model/humidifier');
const Humid_Control_Url = require('../url_Model/humidifier_Url');

router.get('/ON', (req, res, next) => {

	console.log('aiSolutionOn');
	aiSolution_Status.power=1;
	if(humidifier.power==0)
	{	    
	    console.log('Humid_PowerOn');
	    humidifier.power=1;
	    Humid_Control_Url.path += humidifier.control.power;
	    console.log(humidifier.control.power);

	    http.request(Humid_Control_Url).end();
	    Humid_Control_Url.path = '?';
	}

	res.json(JSON.stringify({}));
});

router.get('/OFF', (req, res, next) =>{

	    console.log('aiSolutionOFF');
	aiSolution_Status.power=0;
	if(humidifier.power==1)
	{	    
	    console.log('Humid_PowerOFF');
	    humidifier.power=0;
	    Humid_Control_Url.path += humidifier.control.power;
	    console.log(humidifier.control.power);

	    http.request(Humid_Control_Url).end();
	    Humid_Control_Url.path = '?';
	}
	res.json(JSON.stringify({}));
});


module.exports = router;