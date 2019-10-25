const express = require('express');
const http = require('http');
const router = express.Router();

const airconditioner_Url = require('../url_Model/airconditioner_Url');
const airconditioner = require('../model/airconditioner');
const Airconditioner_Control = require('../machine_control/airconditioner_control');

router.get('/power', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Power();
    console.log('Airconditioner Power');
    Airconditioner_Control.Airconditioner_Send_command();
});


router.get('/speedup', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Speed();
    Airconditioner_Control.Airconditioner_Send_command();
});

router.get('/tempup', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,2);
});

router.get('/tempdown', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,1);
});


module.exports = router;
