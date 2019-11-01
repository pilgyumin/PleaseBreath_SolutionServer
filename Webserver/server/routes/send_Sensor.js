const express = require('express');
const http = require('http');
const router = express.Router();




const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');
const solution_status = require('../model/solution_status');

let mode_control = require('../machine_control/mode_control');


//Time Setting
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

let year;
let month;
let date;
let hours;
let minute;
let second;


let webserver_Url = {
    hostname: '192.168.0.5',
    port: '80',
    path : '/insertdb?'
};

let isOuter = true;

router.get('', (req, res, next) => {
    console.log(solution_status.mode);
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
        console.log("vocOuter : " + req.query.vocOuter);
        status_Outer.voc_Outer = req.query.vocOuter;
    }

    if(req.query.vocInner){
        isOuter = false;
        let vIn = req.query.vocInner.split(".");
        console.log("vocInner : " + req.query.vocInner);
        status_Inner.voc_Inner = req.query.vocInner;
    }

    if(req.query.co2Outer){
        isOuter = true;
        let cOut = req.query.co2Outer.split(".");
        console.log("co2Outer : " + cOut[0]);
        status_Outer.co2_Outer = cOut[0];
    }

    if(req.query.co2Inner){
        isOuter = false;
        let cIn = req.query.co2Inner.split(".");
        console.log("co2Inner : " + cIn[0]);
        status_Inner.co2_Inner = cIn[0];
    }


    if(isOuter){
        webserver_Url.path += status_Outer.getUrl();
        console.log(webserver_Url.path);
    }

    else{
        webserver_Url.path += status_Inner.getUrl();
        console.log(webserver_Url.path);
    }

    if(solution_status.mode!=0)
    {
        console.log('enter');
      mode_control(status_Outer.tempOuter,status_Inner.tempInner,status_Inner.humidInner,status_Inner.pm10Inner,status_Inner.pm25Inner
      ,status_Inner.vocInner,status_Inner.co2Inner);
    }

    year = moment().year();
    month = moment().month() + 1;
    date = moment().date();
    hours = moment().hours();
    minute = moment().minute();
    second = moment().seconds();

    webserver_Url.path +='&year='+year+'&month='+month+'&date='+date+'&hours='+hours+'&minute='+minute+'&second='+second;
    //http.request(webserver_Url).end();
    webserver_Url.path = '/insertdb?';

    res.json(JSON.stringify(webserver_Url));

    console.log(webserver_Url);
});

module.exports = router;
