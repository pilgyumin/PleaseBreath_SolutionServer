const express = require('express');
const http = require('http');
const router = express.Router();


const aiSolution = require('../model/aiSolution');

const statusInner = require('../model/statusInner');
const statusOuter = require('../model/statusOuter');

let aircleanercontrol = require('../machinecontrol/aircleanercontrol');
let humidifiercontrol = require('../machinecontrol/humidifiercontrol');

let airconditionerUrl = {
    hostname: '192.168.0.7',
    port: '3000',
    path : '?'
};

let webserverUrl = {
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
        statusOuter.tempOuter = tOut[0];
    }

    if(req.query.tempInner){
        isOuter = false;
        let tIn = req.query.tempInner.split(".");
        console.log("tempInner : " + tIn[0]);
        statusInner.tempInner = tIn[0];
    }

    //humid
    if(req.query.humidOuter){
        isOuter = true;
        let hOut = req.query.humidOuter.split(".");
        console.log("humidOuter : " + hOut[0]);
        statusOuter.humidOuter = hOut[0];
    }

    if(req.query.humidInner){
        isOuter = false;
        let hIn = req.query.humidInner.split(".");
        console.log("humidInner : " + hIn[0]);
        statusInner.humidInner = hIn[0];
    }

    //pm10
    if(req.query.pm10Outer){
        isOuter = true;
        let p10Out = req.query.pm10Outer.split(".");
        console.log("pm10Outer : " + p10Out[0]);
        statusOuter.pm10Outer = p10Out[0];
    }

    if(req.query.pm10Inner){
        isOuter = false;
        let p10In = req.query.pm10Inner.split(".");
        console.log("pm10Inner : " + p10In[0]);
        statusInner.pm10Inner = p10In[0];
    }

    //pm2.5
    if(req.query.pm25Outer){
        isOuter = true;
        let p25Out = req.query.pm25Outer.split(".");
        console.log("pm25Outer : " + p25Out[0]);
        statusOuter.pm25Outer = p25Out[0];
    }

    if(req.query.pm25Inner){
        isOuter = false;
        let p25In = req.query.pm25Inner.split(".");
        console.log("pm25Inner : " + p25In[0]);
        statusInner.pm25Inner = p25In[0];
    }

    //voc
    if(req.query.vocOuter){
        isOuter = true;
        let vOut = req.query.vocOuter.split(".");
        console.log("vocOuter : " + vOut[0]);
        statusOuter.vocOuter = vOut[0];
    }

    if(req.query.vocInner){
        isOuter = false;
        let vIn = req.query.vocInner.split(".");
        console.log("vocInner : " + vIn[0]);
        statusInner.vocInner = vIn[0];
    }

    if(isOuter){
        webserverUrl.path += statusOuter.getUrl();
        console.log(webserverUrl.path);
    }

    else{
        webserverUrl.path += statusInner.getUrl();
        console.log(webserverUrl.path);
    }

	if(aiSolution.power==1){
	    if(statusInner.pm10Inner && statusInner.pm25Inner){
	        aircleanercontrol(statusInner.pm10Inner,statusInner.pm25Inner);
	    }
	
	    if(statusInner.tempInner){
	        humidifiercontrol(statusInner.tempInner);
    		}
	}

    http.request(webserverUrl).end();
    webserverUrl.path = '/insertdb?';

    airconditionerUrl.path = '?';

    res.json(JSON.stringify(webserverUrl));

    console.log(webserverUrl);
});

module.exports = router;
