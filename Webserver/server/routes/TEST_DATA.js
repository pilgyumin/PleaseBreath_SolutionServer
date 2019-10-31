const express = require('express');
const http = require('http');
const router = express.Router();

const Status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');
const TEST = require('../machine_control/TEST/Show_Status');

router.get('/', (req, res, next) => {
    TEST.Show_Status();
});

router.get('/weather', (req, res, next) => {
    console.log('Test');



     if(req.query.tempOuter){
         status_Outer.temp_Outer = req.query.tempOuter;
     }
     if(req.query.tempInner){
         Status_Inner.temp_Inner = req.query.tempInner;
     }
 
     //humid
     if(req.query.humidOuter){
         status_Outer.humid_Outer = req.query.humidOuter;
     }
     if(req.query.humidInner){
         Status_Inner.humid_Inner = req.query.humidInner;
     }
 
     //pm10
     if(req.query.pm10Outer){
         status_Outer.pm10_Outer = req.query.pm10Outer;
     }
     if(req.query.pm10Inner){
         Status_Inner.pm10_Inner = req.query.pm10Inner;
     }
 
     //pm2.5
     if(req.query.pm25Outer){
         status_Outer.pm25_Outer = req.query.pm25Outer;
     }
     if(req.query.pm25Inner){
         Status_Inner.pm25_Inner = req.query.pm25Inner;
     }
 
     //voc
     if(req.query.vocOuter){
         status_Outer.voc_Outer = req.query.vocOuter;
     }
     if(req.query.vocInner){
         Status_Inner.voc_Inner = req.query.vocInner;
     }
 
     //co2
     if(req.query.co2Outer){
         status_Outer.co2_Outer = req.query.co2Outer;
     }
     if(req.query.co2Inner){
         Status_Inner.co2_Inner = req.query.co2Inner;
     }
     TEST.Show_Status();
})

module.exports = router;