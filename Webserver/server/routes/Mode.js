const express = require('express');
const http = require('http');
const router = express.Router();

const solution_status = require('../model/solution_status');


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
    }
    res.json({});
});

module.exports = router;
