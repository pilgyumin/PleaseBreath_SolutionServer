const express = require('express');
const http = require('http');
const router = express.Router();

const solution_status = require('../model/solution_status');
const inner_status = require('../model/status_Inner');
const outer_status = require('../model/status_Outer');
const airconditioner_status = require('../model/airconditioner');
router.post('/get',(req,res,next)=>{
    let data ={
        power : 0,
        temp : 0,
        humid : 0
    }

    data.power = solution_status.mode;
    data.temp = inner_status.temp_Inner;
    data.humid = inner_status.humid_Inner;

    console.log(JSON.stringify(data));

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header('Content-Type', 'application/json');
    res.header('Accept' , 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Expires", 0);
    res.json(JSON.stringify(data));

});

router.post('/:mode',(req,res,next)=>{
    if(req.params.mode === 'get'){
        let data ={
            power : 0,
            temp : 0,
            humid : 0
        }

        data.power = solution_status.mode;
        data.temp = inner_status.temp_Inner;
        data.humid = inner_status.humid_Inner;

        console.log(JSON.stringify(data));

        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header('Content-Type', 'application/json');
        res.header('Accept' , 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Expires", 0);

        res.json(JSON.stringify(data));
    }
    else{
        airconditioner_status.detail_mode = 1;

        if(outer_status.temp_Outer < 18){
            // 난방 모드로 변경
            airconditioner_status.warm.temp = req.body.temp;
        }
        else{
            // 냉방 모드로 변경
            airconditioner_status.cold.temp = req.body.temp;
        }
        airconditioner_status.humid = req.body.humid;
        console.log(JSON.stringify(req.body));
        res.json({});
    }

});

module.exports = router;
