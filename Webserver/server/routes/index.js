var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    //temp
    if(req.query.tempOuter){
    	console.log("tempOuter : " + req.query.tempOuter);    
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
    	console.log("pm10Outer : " + req.query.pm10Outer);    
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
});

module.exports = router;
