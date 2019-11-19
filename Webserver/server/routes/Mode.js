const express = require('express');
const http = require('http');
const router = express.Router();
const fetch = require('node-fetch');

const solution_status = require('../model/solution_status');

const aircleaner = require('../model/aircleaner');
const airconditioner = require('../model/airconditioner');
const humidifier = require('../model/humidifier');

const aircleaner_url = require('../url_Model/aircleaner_Url');
const airconditioner_url = require('../url_Model/airconditioner_Url');
const humidifier_url = require('../url_Model/humidifier_Url');

router.get('/:mode',(req,res,next)=>{
    if(req.params.mode === 'normal'){
        solution_status.mode=1;
        console.log('Normal Mode Start');
    }
    else if(req.params.mode === 'infacts'){
        solution_status.mode=2;
        console.log('Infants Mode Start');
    }
    else if(req.params.mode === 'senior'){
        solution_status.mode=3;
        console.log('Senior Mode Start');
    }
    else if(req.params.mode === 'sleep'){
        solution_status.mode=4;
        console.log('Sleep Mode Start');
    }
    else if(req.params.mode === 'off'){
        solution_status.mode=0;
        console.log('Solution off ');
        if(aircleaner.power === 1){
            console.log('turn off aircleaner');
            fetch("http://" + aircleaner_url.hostname + ":" + aircleaner_url.port +
                aircleaner_url.path + aircleaner.control.power, {
                method: 'get',
            })
                .then(function (res) {
                    return res.text();
                })
                .catch({});
        }
        if(airconditioner.power === 1){
            console.log('turn off airconditioner');
            fetch("http://" + airconditioner_url.hostname + ":" + airconditioner_url.port +
                airconditioner_url.path  + airconditioner.control.poweroff, {
                method: 'get',
            })
                .then(function (res) {
                    return res.text();
                })
                .catch({});
        }
        if(humidifier.power === 1){
            console.log('turn off humidifier');
            fetch("http://" + humidifier_url.hostname + ":" + humidifier_url.port +
                humidifier_url.path + humidifier.control.power, {
                method: 'get',
            })
                .then(function (res) {
                    return res.text();
                })
                .catch({});
        }
    }
    res.json({});
});

module.exports = router;
