const express = require('express');
const http = require('http');
const router = express.Router();

const Airconditioner_Url = require('../url_Model/airconditioner_Url');
const Airconditioner = require('../model/airconditioner');

const Aircleaner_Url = require('../url_Model/aircleaner_Url');
const Aircleaner = require('../model/aircleaner');

const Humidifier = require('../model/humidifier.js');
const Humid_Control_Url = require('../url_Model/humidifier_Url');

let Status_Inner = require('../model/status_Inner');

router.get('', (req, res, next) => {
    //airconditioner.power=1-airconditioner.power;
    console.log('Senior Mode Start');
    //airconditioner_Url.path += airconditioner.control.power;
    //console.log(airconditioner.control.power);

    let Humid = Status_Inner.humid_Inner;
    //실내 습기가 40% 이하이면
    if(Humid < 40){
        //가습기가 꺼져 있다면 킨다.
        if(Humidifier.power == 0){
            Humidifier.power = 1;
            Humid_Control_Url.path += Humidifier.control.power;
            console.log(Humidifier.control.power);
            http.request(Humid_Control_Url).end();
            Humid_Control_Url.path = '?';
        }
        else{
            //켜져있고 습도가 낮으므로 강도를 임의 값으로 올린다.(추후 변경)
            Humidifier.humid = 50;
            Humidifier.speed = 3;
            Humid_Control_Url.path += Humidifier.control.humid;
	        http.request(Humid_Control_Url).end();
	        Humid_Control_Url.path = '?';
        }
    }
    //실내 습기가 50% 이상이면 가습기를 끈다. -> 알아서 하므로 else 로 하면 될 듯
    else if(Humid > 50){
        /*if(Humidifier.power == 1){
            Humidifier.power = 0;
            Humid_Control_Url.path += Humidifier.control.power;
            console.log(Humidifier.control.power);
            http.request(Humid_Control_Url).end();
            Humid_Control_Url.path = '?';
        }*/
    }
    //실내 습기가 적정이면
    else{
        if(Humidifier.power == 1){
            //켜져있고 습기가 적정이므로 강도를 최소 값으로 조절한다.(추후 변경)
            Humidifier.humid=45;
            Humidifier.speed=1;
            Humid_Control_Url.path += Humidifier.control.power;
	        console.log(Humidifier.control.power);
	        http.request(Humid_Control_Url).end();
	        Humid_Control_Url.path = '?';
        }
    }

    
});

module.exports = router;
