const express = require('express');
const http = require('http');
const router = express.Router();


let aiSolutionStatus = require('../model/aiSolution.js');

const aircleaner = require('../model/aircleaner')
const humidifier = require('../model/humidifier')
const aircleanerUrl = require('../urlModel/aircleanerUrl');
const Humid_Control_Url = require('../urlModel/humidifierUrl');
const aa = {};

router.get('/ON', (req, res, next) => {

	    console.log('aiSolutionOn');
	aiSolutionStatus.power=1;
	if(humidifier.power==0)
	{	    
	    console.log('Humid_PowerOn');
	    humidifier.power=1;
	    Humid_Control_Url.path += humidifier.control.ctrlpower;
	    console.log(humidifier.control.ctrlpower);

	    http.request(Humid_Control_Url).end();
	    Humid_Control_Url.path = '?';
	}

	res.json(JSON.stringify(aa));
});

router.get('/OFF', (req, res, next) =>{

	    console.log('aiSolutionOFF');
	aiSolutionStatus.power=0;
	if(humidifier.power==1)
	{	    
	    console.log('Humid_PowerOFF');
	    humidifier.power=0;
	    Humid_Control_Url.path += humidifier.control.ctrlpower;
	    console.log(humidifier.control.ctrlpower);

	    http.request(Humid_Control_Url).end();
	    Humid_Control_Url.path = '?';
	}
	res.json(JSON.stringify(aa));
});


module.exports = router;