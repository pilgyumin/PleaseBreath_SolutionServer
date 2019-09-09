const express = require('express');
const http = require('http');
const router = express.Router();

let aircleanerUrl = {
    hostname: '192.168.0.7',
    port: '3000',
    path : '?'
};

function ctrlaircleaner(machinestatus,pm10,pm25) {
    if(pm25 > 15 || pm10 > 30){
        if(machinestatus.power == 0){
            aircleanerUrl.path += machinestatus.control.ctrlpower + ' ';
        }


    }
}
