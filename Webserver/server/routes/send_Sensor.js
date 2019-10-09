const express = require('express');
const http = require('http');
const router = express.Router();


const aiSolution = require('../model/aiSolution');


const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');


let aircleaner_control = require('../machinecontrol/aircleaner_control');
let humidifier_control = require('../machinecontrol/humidifier_control');


//Time Setting
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
let year = moment().year();
let month = moment().month() + 1;
let date = moment().date();
let hours = moment().hours();
let minute = moment().minute();
let second = moment().seconds();

let airconditioner_Url = {
    hostname: '192.168.0.7',
    port: '3000',
    path : '?'
};

let webserver_Url = {
    hostname: '192.168.0.5',
    port: '80',
    path : '/insertdb?'
};

let isOuter = true;

router.get('', (req, res, next) => {

    //temp
    if(req.query.tempOuter){
        isOuter = true;
        let tOut = req.query.tempOuter.split(".");
        console.log("tempOuter : " + tOut[0]);
        status_Outer.temp_Outer = tOut[0];
    }

    if(req.query.tempInner){
        isOuter = false;
        let tIn = req.query.tempInner.split(".");
        console.log("tempInner : " + tIn[0]);
        status_Inner.temp_Inner = tIn[0];
    }

    //humid
    if(req.query.humidOuter){
        isOuter = true;
        let hOut = req.query.humidOuter.split(".");
        console.log("humidOuter : " + hOut[0]);
        status_Outer.humid_Outer = hOut[0];
    }

    if(req.query.humidInner){
        isOuter = false;
        let hIn = req.query.humidInner.split(".");
        console.log("humidInner : " + hIn[0]);
        status_Inner.humid_Inner = hIn[0];
    }

    //pm10
    if(req.query.pm10Outer){
        isOuter = true;
        let p10Out = req.query.pm10Outer.split(".");
        console.log("pm10Outer : " + p10Out[0]);
        status_Outer.pm10_Outer = p10Out[0];
    }

    if(req.query.pm10Inner){
        isOuter = false;
        let p10In = req.query.pm10Inner.split(".");
        console.log("pm10Inner : " + p10In[0]);
        status_Inner.pm10_Inner = p10In[0];
    }

    //pm2.5
    if(req.query.pm25Outer){
        isOuter = true;
        let p25Out = req.query.pm25Outer.split(".");
        console.log("pm25Outer : " + p25Out[0]);
        status_Outer.pm25_Outer = p25Out[0];
    }

    if(req.query.pm25Inner){
        isOuter = false;
        let p25In = req.query.pm25Inner.split(".");
        console.log("pm25Inner : " + p25In[0]);
        status_Inner.pm25_Inner = p25In[0];
    }

    //voc
    if(req.query.vocOuter){
        isOuter = true;
        let vOut = req.query.vocOuter.split(".");
        console.log("vocOuter : " + vOut[0]);
        status_Outer.voc_Outer = vOut[0];
    }

    if(req.query.vocInner){
        isOuter = false;
        let vIn = req.query.vocInner.split(".");
        console.log("vocInner : " + vIn[0]);
        status_Inner.voc_Inner = vIn[0];
    }

    if(req.query.co2Outer){
        isOuter = true;
        let cOut = req.query.co2Outer.split(".");
        console.log("vocOuter : " + cOut[0]);
        statusOuter.co2Outer = cOut[0];
    }

    if(req.query.co2Inner){
        isOuter = false;
        let cIn = req.query.co2Inner.split(".");
        console.log("vocInner : " + cIn[0]);
        statusInner.co2Inner = cIn[0];
    }


    if(isOuter){
        webserver_Url.path += status_Outer.getUrl();
        console.log(webserver_Url.path);
    }

    else{
        webserver_Url.path += status_Inner.getUrl();
        console.log(webserver_Url.path);
    }
    aiSolution.power = 1;
    if(aiSolution.power === 1){

        if(status_Inner.pm10_Inner && status_Inner.pm25_Inner){
            aircleaner_control(status_Inner.pm10_Inner,status_Inner.pm25_Inner,status_Inner.voc_Inner,status_Inner.voc_Inner);
        }

        if(status_Inner.temp_Inner){
            humidifier_control(status_Inner.temp_Inner);
        }
    }

    webserverUrl.path +='&year'+year+'&month'+month+'&date'+date+'&hours'+hours+'&minute'+minute+'&second'+second; 
    http.request(webserver_Url).end();
    webserver_Url.path = '/insertdb?';

    

    airconditioner_Url.path = '?';

    res.json(JSON.stringify(webserver_Url));

    console.log(webserver_Url);
});

module.exports = router;
