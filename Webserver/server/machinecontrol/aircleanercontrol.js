const express = require('express');
const http = require('http');
const router = express.Router();
const aircleaner = require('../model/aircleaner');

/*
* 매우 나쁨 = pm10 : 150 ~        세기 4
*            pm2.5 : 75 ~
*
*      나쁨 = pm10 : 80 ~ 150     세기 3
*            pm2.5 : 35 ~ 75
*
*      보통 = pm10 : 30 ~ 80      세기 2
*            pm2.5 : 15 ~ 35
*
*      좋음 = pm10 :  10 ~ 30     세기 1
*             pm2.5 : 5 ~ 15
*
*      너무 좋음 = pm10 : 0 ~ 10   세기 0
*                 pm2.5 : 0 ~ 5
* */

function ctrlaircleaner(pm10,pm25) {

    let aircleanerUrl = {
        hostname: '192.168.0.8',
        port: '3000',
        path : '?'
    };

    if(pm25 > 5 || pm10 > 10){
        if(aircleaner.power == 0){
            aircleanerUrl.path += aircleaner.control.ctrlpower + '&';
        }
        aircleaner.power = 1;

        let speed = aircleaner.speed;

        if(pm25 < 15 || pm10 < 30){
            if(speed  > 1) {
                for (let i = 0; i < speed - 1; i++) {
                    aircleanerUrl.path += aircleaner.control.ctrlspeeddown + '&';
                }
            }
            aircleaner.speed = 1;
        }

        if(pm25 > 35 || pm10 > 80){
            let max = 0;
            if(speed < 3) {
                for (let i = 0; i < 3 - speed; i++) {
                    aircleanerUrl.path += aircleaner.control.ctrlspeedup + '&';
                }
                if(pm25 > 75 || pm10 > 150){
                    aircleanerUrl.path += aircleaner.control.ctrlspeedup + '&';
                    max = 4;
                    aircleaner.speed = 4;
                }
            }
            else{
                aircleanerUrl.path += aircleaner.control.ctrlspeeddown + '&';
            }
            if(max < 4) {
                aircleaner.speed = 3;
            }
        }
        console.log(JSON.stringify(aircleaner));
    }
    else{
        if(aircleaner.power == 1){
            aircleanerUrl.path += aircleaner.control.ctrlpower + '&';
        }

        aircleaner.power = 0;
        aircleaner.speed = 2;
        console.log(JSON.stringify(aircleaner));
    }

    console.log(aircleanerUrl.path);

    if(aircleanerUrl.path != '?'){
        http.request(aircleanerUrl).end();
        aircleanerUrl.path = '?';
    }

}

module.exports = ctrlaircleaner;
