const express = require('express');
const http = require('http');
const router = express.Router();

let humidifier = require('../model/humidifier.js');

const Humidify_Controler = require('../machine_control/humidifier_control');
const Humid_Control_Url = require('../url_Model/humidifier_Url');
const TEST = require('../machine_control/TEST/Show_Status');

router.get('/power', (req, res, next) => {
	
	Humidify_Controler.Humidifier_Power();
	Humidify_Controler.Humidifier_Speed_up();
	humidifier.speed=1;

	Humidify_Controler.Humidifier_Send_command();

	/*humidifier.power=1-humidifier.power;
	if(humidifier.power==1){
		humidifier.speed=1;
	}
	console.log('Humid_PowerOn');
	Humid_Control_Url.path += 'power';
	console.log(humidifier.control.power);

	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';*/
	console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
	res.json(JSON.stringify({}));
});


router.get('/speedup', (req, res, next) => {
	Humidify_Controler.Humidifier_Speed_up();
	Humidify_Controler.Humidifier_Send_command();

	/*if(humidifier.speed != 8){
		humidifier.speed += 1;
	console.log('Humid_speed_up');
	Humid_Control_Url.path += humidifier.control.speed_up;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
	}*/
	console.log(TEST.Show_Command());
	console.log(TEST.Show_Status());
	res.json(JSON.stringify({}));
});

router.get('/speeddown', (req, res, next) => {
	Humidify_Controler.Humidifier_Speed_down();
	Humidify_Controler.Humidifier_Send_command();
	
	/*if(humidifier.speed != 1){
		humidifier.speed -= 1;
	console.log('Humid_speed_down');
	Humid_Control_Url.path += humidifier.control.speed_down;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
	}*/
	console.log(TEST.Show_Command());
	console.log(TEST.Show_Status());
	res.json(JSON.stringify({}));
});


router.get('/mist', (req, res, next) =>{
	if(humidifier.humid==90){
		humidifier.humid=40;
	}
	else{
		humidifier.humid+=5;
	}
	console.log('mist On');
	Humid_Control_Url.path += humidifier.control.humid;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
});

router.get('/humidity', (req, res, next) =>{
	humidifier.speed=(humidifier.speed)%3+1;
	console.log('Humidity');
	Humid_Control_Url.path += humidifier.control.speed;
	http.request(Humid_Control_Url).end();
	Humid_Control_Url.path = '?';
	res.json(JSON.stringify({}));
});



module.exports = router;
