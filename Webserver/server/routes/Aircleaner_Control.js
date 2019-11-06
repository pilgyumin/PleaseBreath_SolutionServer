const express = require('express');
const http = require('http');
const router = express.Router();

const aircleaner_Url = require('../url_Model/aircleaner_Url');
const aircleaner = require('../model/aircleaner');
const Aircleaner_Controler = require('../machine_control/aircleaner_control');
const TEST = require('../machine_control/TEST/Show_Status');


router.get('/power', (req, res, next) => {
  console.log('Aircleaner start');
    Aircleaner_Controler.Aircleaner_Power();
    Aircleaner_Controler.Aircleaner_Send_command();
    /*aircleaner.power=1-aircleaner.power;
    if(aircleaner.power==1){
      aircleaner.speed=1;
    }
    console.log('Aircleaner Power');
    aircleaner_Url.path += aircleaner.control.power;
    console.log(aircleaner.control.power);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';*/

    console.log(TEST.Show_Command());
    res.json(JSON.stringify({}));
});

router.get('/speedup', (req, res, next) => {
  Aircleaner_Controler.Aircleaner_Speed_up();
    Aircleaner_Controler.Aircleaner_Send_command();
   /* if(aircleaner.speed<4){
      aircleaner.speed++;
    }
    console.log('Aircleaner speedup');
    aircleaner_Url.path += aircleaner.control.speed_up;
    console.log(aircleaner.control.speed_up);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';*/
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});

router.get('/speeddown', (req, res, next) => {
  Aircleaner_Controler.Aircleaner_Speed_down();
  Aircleaner_Controler.Aircleaner_Send_command();
    /*if(aircleaner.speed>0){
      aircleaner.speed--;
    }
    console.log('Aircleaner speeddown');
    aircleaner_Url.path += aircleaner.control.speed_down;
    console.log(aircleaner.control.speed_down);
    http.request(aircleaner_Url).end();
    aircleaner_Url.path = '?';*/
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});

module.exports = router;
