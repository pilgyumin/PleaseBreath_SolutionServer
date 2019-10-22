const express = require('express');
const http = require('http');
const router = express.Router();

const Airconditioner_Url = require('../url_Model/airconditioner_Url');
const Airconditioner = require('../model/airconditioner');

const Aircleaner_Url = require('../url_Model/aircleaner_Url');
const Aircleaner = require('../model/aircleaner');

const Humidifier = require('../model/humidifier.js');
const Humid_Control_Url = require('../url_Model/humidifier_Url');
const Humidifier_Controler = require('../machine_control/humidifier_control');

let Status_Inner = require('../model/status_Inner');

//일반 모드
router.get('/',(req,res,next)=>{


});

//노인 모드
router.get('/Senior', (req, res, next) => {
    console.log('Senior Mode Start');

    let Humid = Status_Inner.humid_Inner;
    //실내 습기가 40% 이하이면
    if(Humid < 40){
        //가습기가 꺼져 있다면 킨다.
        if(Humidifier.power == 0){
            Humidifier_Controler.Humidifier_Power();
            Humidifier_Controler.Humidifier_Speed(3);
        }
        else{
            //켜져있고 습도가 낮으므로 강도를 임의 값으로 올린다.(추후 변경)
            Humidifier_Controler.Humidifier_Speed(3);
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
            Humidifier.speed=1;
            Humid_Control_Url.path += Humidifier.speed;
	        console.log(Humidifier.control.power);
	        http.request(Humid_Control_Url).end();
	        Humid_Control_Url.path = '?';
        }
    }

    let pm10_Inner = Status_Inner.pm10_Inner;
    let pm25_Inner = Status_Inner.pm25_Inner;


    //공기상태가 최적이면 일단 끈다. -> 추후 변경
    if(pm10_Inner < 30 && pm25_Inner < 15){

        /*Aircleaner.power=1-Aircleaner.power;
        if(Aircleaner.power==1){
            Aircleaner.speed=1;
        }*/
        Aircleaner.power= 0;
        console.log('Aircleaner Power Off');
        Aircleaner_Url.path += aircleaner.power;
        http.request(Aircleaner_Url).end();
        Aircleaner_Url.path = '?';
    }

    //공기상태가 최악이면 파워를 최대로 올린다.
    else if(pm10_Inner >= 81 || pm25_Inner >= 36){
        if(Aircleaner.power == 0)
            Aircleaner.power=1;
        
        console.log('Current PM : Warning ');
        Aircleaner_Url.path += Aircleaner.power;
        Aircleaner.speed = 8;
        Aircleaner_Url.path += Aircleaner.speed;
        http.request(Aircleaner_Url).end();
        Aircleaner_Url.path = '?';
    }

    else if(pm10_Inner <= 80 || pm25_Inner <= 35){
        if(Aircleaner.power == 0){
            Aircleaner.power=1;
            console.log('Current PM : Normal ');
            Aircleaner_Url.path += Aircleaner.power;
        }

        Aircleaner.speed = 4;
        Aircleaner_Url.path += Aircleaner.speed;
        http.request(Aircleaner_Url).end();
        Aircleaner_Url.path = '?';
    }

    let Temp = Status_Inner.temp_Inner;

    if(Temp < 25){
        if(Airconditioner.power == 0){
            Airconditioner.power = 1;
            Airconditioner_Url.path += airconditioner.control.power;
        }
        console.log('Airconditioner Power');
        console.log(Airconditioner.control.power);
        Airconditioner_Url.path += Airconditioner.control.coldtemp27;
        http.request(Airconditioner_Url).end();
        Airconditioner_Url.path = '?';
        res.json(JSON.stringify({}));
    }
    else if(Temp > 29){

        if(Airconditioner.power == 0){
            Airconditioner.power = 1;
            Airconditioner_Url.path += airconditioner.control.power;
        }
        console.log('Airconditioner Power');
        console.log(Airconditioner.control.power);
        Airconditioner_Url.path += Airconditioner.control.coldtemp26;
        http.request(Airconditioner_Url).end();
        Airconditioner_Url.path = '?';
        res.json(JSON.stringify({}));
    }
    else if(Temp >=26 && Temp <= 28) {

        if(Airconditioner.power == 0){
            Airconditioner.power = 1;
            Airconditioner_Url.path += airconditioner.control.power;
        }
        console.log('Airconditioner Power');
        console.log(Airconditioner.control.power);
        Airconditioner_Url.path += Airconditioner.control.coldtemp27;
        http.request(Airconditioner_Url).end();
        Airconditioner_Url.path = '?';
        res.json(JSON.stringify({}));
    }
});

module.exports = router;
