const express = require('express');
const http = require('http');
const router = express.Router();

const solution_status = require('../model/solution_status');


router.get('/',(req,res,next)=>{


});
//일반 모드
router.get('/Normal',(req,res,next)=>{
    solution_status.mode=1;
      console.log('Normal Mode Start');

      res.json(JSON.stringify({}));
});
//영유아 모드
router.get('/Infants',(req,res,next)=>{
  solution_status.mode=2;
    console.log('Infants Mode Start');

    res.json(JSON.stringify({}));
});

//노인 모드
router.get('/Senior', (req, res, next) => {
    solution_status.mode=3;
    console.log('Senior Mode Start');

    res.json(JSON.stringify({}));
});

module.exports = router;
