const express = require('express');
const http = require('http');
const router = express.Router();

const solution_status = require('../model/solution_status');
const inner_status = require('../model/status_Inner');
const airconditioner_status = require('../model/airconditioner');

router.get('/:mode',(req,res,next)=>{
    if(req.params.mode === 'get'){
        let data ={
            power : 0,
            temp : 0,
            humid : 0
        }

        data.power = solution_status.mode;
        data.temp = inner_status.temp_Inner;
        data.temp = inner_status.humid_Inner;

        airconditioner_status.detail_mode = 1;

        console.log(solution_status.mode);
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header('Content-Type', 'application/json');
        res.header('Accept' , 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Expires", 0);
        console.log(JSON.stringify(data));
        res.json(JSON.stringify(data));
    }
    else{

    }

});

module.exports = router;
