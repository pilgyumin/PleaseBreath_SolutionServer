const express = require('express');
const http = require('http');
const router = express.Router();

const solution_status = require('../model/solution_status');


router.get('/:mode',(req,res,next)=>{
    let data ={
        power : 0
    }
    if(req.params.mode === 'solutionPower'){
        data.power = solution_status.mode;
    }
    console.log(solution_status.mode);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header('Content-Type', 'application/json');
    res.header('Accept' , 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Expires", 0);
    console.log(JSON.stringify(data));
    res.json(JSON.stringify(data));
});

module.exports = router;
