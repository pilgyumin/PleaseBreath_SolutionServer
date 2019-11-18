// 전체 개발 (민필규)

const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const fetch = require('node-fetch');
const solution_status = require('../model/solution_status');

const aircleaner = require('../model/aircleaner');
const airconditioner = require('../model/airconditioner');
const humidifier = require('../model/humidifier');

const aircleaner_url = require('../url_Model/aircleaner_Url');
const airconditioner_url = require('../url_Model/airconditioner_Url');
const humidifier_url = require('../url_Model/humidifier_Url');

let turn_on_solution_job;
let turn_off_solution_job;

let is_reservation_on = 0;
let is_reservation_off = 0;
router.post('/:mode/:power', (req, res, next) => {
    // 솔루션 가동 예약 명령
   let reservation_data = req.body.data * 1000;
   let reservation_time = new Date(reservation_data);
   let date = new Date(reservation_time.getFullYear(), reservation_time.getMonth(), reservation_time.getDate()
       , reservation_time.getHours(),reservation_time.getMinutes(), 0);


    if(req.params.mode === 'turnOnSolution'){
        if(req.params.power === 'on'){
            is_reservation_on = 1;
            console.log('turn on solution reservation on');
            turn_on_solution_job = schedule.scheduleJob(date, function(){
                console.log('turn on solution!!!!!!!!!');
                solution_status.mode = req.body.mode;
                console.log('mode : ' + req.body.mode);
                turn_on_solution_job.cancel();
            });
        }
        else{
            if(is_reservation_on == 1) {
                solution_status.mode = 0;
                console.log('turn on solution reservation off');
                turn_on_solution_job.cancel();
                is_reservation_on = 0;
            }
        }
    }
    // 솔루션 꺼짐 예약 명령
    else{
        if(req.params.power === 'on'){
            is_reservation_off = 1;
            console.log('turn off solution reservation on');
            turn_off_solution_job = schedule.scheduleJob(date, function(){
                console.log('turn off solution!!!!!!!!!');
                solution_status.mode = 0;
                if(aircleaner.power == 1){
                    fetch("http://" + aircleaner_url.hostname + ":" + aircleaner_url.port +
                        aircleaner_url.path + aircleaner.control.power, {
                        method: 'get',
                    })
                        .then(res => res.json())
                        .catch(res => res.json());
                }
                if(airconditioner.power == 1){
                    fetch("http://" + airconditioner_url.hostname + ":" + airconditioner_url.port +
                        airconditioner_url.path  + airconditioner.control.poweroff, {
                        method: 'get',
                    })
                        .then(res => res.json())
                        .catch(res => res.json());
                }
                if(humidifier.power == 1){
                    fetch("http://" + humidifier_url.hostname + ":" + humidifier_url.port +
                        humidifier_url.path + humidifier.control.power, {
                        method: 'get',
                    })
                        .then(res => res.json())
                        .catch(res => res.json());
                }
                turn_off_solution_job.cancel();
            });
        }
        else{
            if(is_reservation_off == 1) {
                solution_status.mode = 1;
                console.log('turn off solution reservation off');
                turn_off_solution_job.cancel();
                is_reservation_off = 0;
            }
        }
    }

    res.json(JSON.stringify({}));
});

module.exports = router;
