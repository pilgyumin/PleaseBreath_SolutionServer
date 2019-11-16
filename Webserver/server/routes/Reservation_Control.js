// 전체 개발 (민필규)

const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const solution_status = require('../model/solution_status');

let turn_on_solution_job;
let turn_off_solution_job;


router.post('/:mode/:power', (req, res, next) => {
    // 솔루션 가동 예약 명령
   let reservation_data = req.body.data * 1000;
   let reservation_time = new Date(reservation_data);
   let date = new Date(reservation_time.getFullYear(), reservation_time.getMonth(), reservation_time.getDate()
       , reservation_time.getHours(),reservation_time.getMinutes(), 0);


    if(req.params.mode === 'turnOnSolution'){
        if(req.params.power === 'on'){
            console.log('turn on solution reservation on');
            turn_on_solution_job = schedule.scheduleJob(date, function(){
                console.log('turn on solution!!!!!!!!!');
                solution_status.power = 1;
                turn_on_solution_job.cancel();
            });
        }
        else{
            solution_status.power = 0;
            console.log('turn on solution reservation off');
            turn_on_solution_job.cancel();
        }
    }
    // 솔루션 꺼짐 예약 명령
    else{
        if(req.params.power === 'on'){
            console.log('turn off solution reservation on');
            turn_off_solution_job = schedule.scheduleJob(date, function(){
                console.log('turn off solution!!!!!!!!!');
                solution_status.power = 0;
                turn_off_solution_job.cancel();
            });
        }
        else{
            solution_status.power = 1;
            console.log('turn off solution reservation off');
            turn_off_solution_job.cancel();
        }
    }
    res.json(JSON.stringify({}));
});

module.exports = router;
