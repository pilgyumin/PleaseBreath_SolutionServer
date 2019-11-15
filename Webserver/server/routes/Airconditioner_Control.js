const express = require('express');
const http = require('http');
const router = express.Router();

const airconditioner_Url = require('../url_Model/airconditioner_Url');
const airconditioner = require('../model/airconditioner');
const Airconditioner_Control = require('../machine_control/airconditioner_control');
const TEST = require('../machine_control/TEST/Show_Status');

router.get('/power', (req, res, next) => {
    console.log('Airconditioner Power On');
    Airconditioner_Control.Airconditioner_Power();
    Airconditioner_Control.Airconditioner_Send_command();

    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});

//모드 변경
router.get('/warm', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Mode_Change(1);
    Airconditioner_Control.Airconditioner_Send_command();
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});
router.get('/cold', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Mode_Change(0);
    Airconditioner_Control.Airconditioner_Send_command();
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});
router.get('/dehumidity', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Mode_Change(2);
    Airconditioner_Control.Airconditioner_Send_command();
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());
    res.json(JSON.stringify({}));
});

//바람세기
router.get('/speeddown', (req, res, next) => {
     //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3

    let Current_Mode = airconditioner.mode;
    if(Current_Mode == 0 && airconditioner.cold.speed != 1)
        Airconditioner_Control.Airconditioner_Speed(--airconditioner.cold.speed);    
    else if(Current_Mode == 1 && airconditioner.warm.speed != 1)
        Airconditioner_Control.Airconditioner_Speed(--airconditioner.warm.speed);    
    else
        console.log("CurrentMode = " + Current_Mode + "Control fail");
    
    Airconditioner_Control.Airconditioner_Send_command();

    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());


    res.json(JSON.stringify({}));
});

router.get('/speedup', (req, res, next) => {
    let Current_Mode = airconditioner.mode;

    if(Current_Mode == 0 && airconditioner.cold.speed != 3)
        Airconditioner_Control.Airconditioner_Speed(++airconditioner.cold.speed);    
    else if(Current_Mode == 1 && airconditioner.warm.speed != 3)
        Airconditioner_Control.Airconditioner_Speed(++airconditioner.warm.speed);    
    else
        console.log("CurrentMode = " + Current_Mode + "Control fail");
    
    Airconditioner_Control.Airconditioner_Send_command();

    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());


    res.json(JSON.stringify({}));
});

//온도조절
router.get('/tempup', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,1);
    Airconditioner_Control.Airconditioner_Send_command();

    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());

    res.json(JSON.stringify({}));
});

router.get('/tempdown', (req, res, next) => {
    Airconditioner_Control.Airconditioner_Temp(0,2);
    Airconditioner_Control.Airconditioner_Send_command();
    console.log(TEST.Show_Command());
    console.log(TEST.Show_Status());

    res.json(JSON.stringify({}));
});


module.exports = router;
