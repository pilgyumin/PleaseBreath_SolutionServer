const express = require('express');
const http = require('http');
const router = express.Router();

const aircleaner_Url = require('../url_Model/aircleaner_Url');
const aircleaner = require('../model/aircleaner');

router.get('/power', (req, res, next) => {
    aircleaner.power=1-aircleaner.power;
    if(aircleaner.power==1){
      aircleaner.speed=1;
    }
    console.log('Aircleaner Power');
    aircleaner_Url.path += aircleaner.control.power;
    console.log(aircleaner.control.power);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';
    res.json(JSON.stringify({}));
});

router.get('/speedup', (req, res, next) => {
    if(aircleaner.speed<4){
      aircleaner.speed++;
    }
    console.log('Aircleaner speedup');
    aircleaner_Url.path += aircleaner.control.speed_up;
    console.log(aircleaner.control.speed_up);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';
    res.json(JSON.stringify({}));
});

router.get('/speeddown', (req, res, next) => {
    if(aircleaner.speed>0){
      aircleaner.speed--;
    }
    console.log('Aircleaner speeddown');
    aircleaner_Url.path += aircleaner.control.speed_down;
    console.log(aircleaner.control.speed_down);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';
    res.json(JSON.stringify({}));
});

module.exports = router;
