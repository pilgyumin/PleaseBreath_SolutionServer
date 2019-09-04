const express = require('express');
const http = require('http');
const router = express.Router();

let aircleaner = {
    hostname: '192.168.0.10',
    port: '3000',
    path : '?'
};

let humidifier = {
    hostname: 'localhost',
    port: '3000',
    path : '?'
};
let airconditioner = {
    hostname: '192.168.0.10',
    port: '3000',
    path : '?'
};


router.get('/', (req, res, next) => {
    //temp
    if(req.query.tempOuter){
        let tOut = req.query.tempOuter.split(".");
        console.log("tempOuter : " + tOut[0]);
        if(tOut[0] > 30){
            console.log("Aircon On!");
            airconditioner.path += tOut[0];
            console.log(airconditioner.path);
            http.request(airconditioner).end();
        }
    }

    if(req.query.tempInner){
        console.log("tempInner : " + req.query.tempInner);   
    }

    //humid
    if(req.query.humidOuter){
    	console.log("humidOuter : " + req.query.humidOuter);    
    }

    if(req.query.humidInner){
    	console.log("humidInner : " + req.query.humidInner);    
    }

    //pm10
    if(req.query.pm10Outer){
        let pOut = req.query.pm10Outer.split(".");
        console.log("pm10Outer : " + pOut[0]);
        if(pOut[0] > 30){
            console.log("Aircleaner On!");
            aircleaner.path += '0x48B7C837';
            console.log(aircleaner.path);
            http.request(aircleaner).end();
            aircleaner.path = '?';
        }
    }

    if(req.query.pm10Inner){
    	console.log("pm10Inner : " + req.query.pm10Inner);   
    }

    //pm2.5
    if(req.query.pm25Outer){
    	console.log("pm25Outer : " + req.query.pm25Outer);    
    }

    if(req.query.pm25Inner){
    	console.log("pm25Inner : " + req.query.pm25Inner);   
    }

    //voc
    if(req.query.vocOuter){
    	console.log("vocOuter : " + req.query.vocOuter);    
    }

    if(req.query.vocInner){
    	console.log("vocInner : " + req.query.vocInner);   	
    }

    res.json(JSON.stringify(aircleaner));
});

module.exports = router;
