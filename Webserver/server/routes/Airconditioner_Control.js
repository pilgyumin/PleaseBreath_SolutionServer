const express = require('express');
const http = require('http');
const router = express.Router();

const airconditioner_Url = require('../url_Model/airconditioner_Url');
const airconditioner = require('../model/airconditioner');
const Airconditioner_Control = require('../machine_control/airconditioner_control');

router.get('/power', (req, res, next) => {
    console.log('Airconditioner Power On');
    
    Airconditioner_Control.Airconditioner_Power();
    
    Airconditioner_Control.Airconditioner_Send_command();
    console.log('Airconditioner Start');
});


router.get('/speed', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Speed();
    Airconditioner_Control.Airconditioner_Send_command();
});

router.get('/tempUp', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,2);
    Airconditioner_Control.Airconditioner_Send_command();
});

router.get('/tempDown', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,1);
    Airconditioner_Control.Airconditioner_Send_command();
});


module.exports = router;
