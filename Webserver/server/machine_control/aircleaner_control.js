const http = require('http');
const aircleaner = require('../model/aircleaner');
const aircleanerUrl = require('../url_Model/aircleaner_Url');

const aircleaner_hostname = '192.168.1.74';
const aircleaner_port = '3000';
const aircleaner_path = '?';

const solution_status = require('../model/solution_status');

var moment = require('moment');
/* 민필규
* 매우 나쁨 =   내부모드 가동 기준 pm10 : 71 ~        세기 4
*                               pm2.5 : 36 ~
*
*              외부모드 가동 기준 voc : 2.201 ~ 10.000
*                               Co2 : 2001 ~ 10000
*
*      나쁨 =   내부모드 가동 기준 pm10 : 51 ~ 70     세기 3
*                                pm2.5 : 26 ~ 35
*
*               외부모드 가동 기준  voc : 0.661 ~ 2.200
*                                 Co2 : 1001 ~ 2000
*
*      보통 =   내부모드 가동 기준  pm10 : 31 ~ 50      세기 2
*                                 pm2.5 : 15 ~ 25
*
*               외부모드 가동 기준  voc : 0.221 ~ 0.660
*                                 Co2 : 701 ~ 1000
*
*      좋음 =   내부모드 가동 기준  pm10 :  10 ~ 30     세기 1
*                                 pm2.5 : 5 ~ 15
*
*               외부모드 가동 기준  voc : 0.111 ~ 0.220
*                                 Co2 : 400 ~ 700
*
*  너무 좋음 =   내부모드 가동 기준  pm10 : 0 ~ 10   세기 0
*                                 pm2.5 : 0 ~ 5
*
*               외부모드 가동 기준  voc : 0.000 ~ 0.110
*                                 Co2 : 0 ~ 400
* */

//공기청정기 최대 속도 4, 최소 속도 1
//최대에서 up을 눌러도 변경x 최소도 마찬가지
//어떤 함수를 쓰던 상태값이 저장됩니다.

function Aircleaner_Power(){
    
    aircleaner.power = 1 - aircleaner.power;
    if(aircleaner.power == 0)
        aircleaner.speed = 1;
    aircleanerUrl.path += aircleaner.control.power + '&';
    
    /*if(aircleanerUrl.path != '?'){
        http.request(aircleanerUrl).end();
        aircleanerUrl.path = '?';
    }*/
}

function Aircleaner_Speed_up(){
    if(aircleaner.speed < 4){
        aircleaner.speed += 1;
        aircleanerUrl.path += aircleaner.control.speed_up + '&';
        /*if(aircleanerUrl.path != '?'){
            http.request(aircleanerUrl).end();
            aircleanerUrl.path = '?';
        }*/
    }
}

function Aircleaner_Speed_down(){
    if(aircleaner.speed > 1){
        aircleaner.speed -= 1;
        aircleanerUrl.path += aircleaner.control.speed_down + '&';
        /*if(aircleanerUrl.path != '?'){
            http.request(aircleanerUrl).end();
            aircleanerUrl.path = '?';
        }*/
    }
}
function Aircleaner_Speed(argv){
    if(aircleaner.speed > argv){
        let i = aircleaner.speed
        for(i; i > argv; i--)
            Aircleaner_Speed_down();
    }

    else if(aircleaner.speed < argv){
        let i = aircleaner.speed
        for(i; i < argv; i++)
            Aircleaner_Speed_up();
    }

}

function Aircleaner_Send_command(){

    if(aircleanerUrl.path != '?'){
        http.request(aircleanerUrl).end();
        aircleanerUrl.path = '?';
    }
}

/* 공기청정기 세기 별 전력량 / 실내 정화시간 / 실외 정화시간
세기 1 : 7.5W / 90분 /
세기 2 : 8.5W / 75분 /
세기 3 : 10W /  60분 /
세기 4 : 22W /  45분 /
*/

const pm10_min = 0;
const pm25_min = 0;
const voc_min = 0;
const co2_min = 400;

const pm10_max = 200;
const pm25_max = 255;
const voc_max = 2.0;
const co2_max = 2000;

const speed1_energy = 7.5;
const speed2_energy = 8.5;
const speed3_energy = 10;
const speed4_energy = 22;

const speed1_inner_time = 90;
const speed2_inner_time = 75;
const speed3_inner_time = 60;
const speed4_inner_time = 45;

const speed1_outer_time = 84;
const speed2_outer_time = 43;
const speed3_outer_time = 35;
const speed4_outer_time = 25;

function control_aircleaner(pm10,pm25,voc,co2) {

    let pm10_pm25_stage_max = 0;
    let voc_co2_stage_max = 0;

    let command = '';

    if(pm25 > 5 || pm10 > 10 || voc > 0.111 || co2 > 400){

        if(aircleaner.power == 0){
            command += aircleaner.control.power + '&';
        }

        aircleaner.power = 1;

        let speed = aircleaner.speed;

        // 민필규 - 미세먼지 단계 여부 파악
        if(pm10 > 0){
            let pm10_scale = (pm10 - pm10_min) / (pm10_max - pm10_min);
            let pm25_scale = (pm25 - pm25_min) / (pm25_max - pm25_min);

            let inner_group_max_scale = pm10_scale > pm25_scale ? pm10_scale : pm25_scale;

            let inner_speed1_spend_time_energy = speed1_inner_time * inner_group_max_scale * speed1_energy;
            let inner_speed2_spend_time_energy = speed2_inner_time * inner_group_max_scale * speed2_energy;
            let inner_speed3_spend_time_energy = speed3_inner_time * inner_group_max_scale * speed3_energy;
            let inner_speed4_spend_time_energy = speed4_inner_time * inner_group_max_scale * speed4_energy;

            let inner_ar = new Array();

            inner_ar.push(inner_speed1_spend_time_energy);
            inner_ar.push(inner_speed2_spend_time_energy);
            inner_ar.push(inner_speed3_spend_time_energy);
            inner_ar.push(inner_speed4_spend_time_energy);

            inner_ar.sort(function (a,b) {
                return a-b;
            });

            if(inner_ar[0] == inner_speed1_spend_time_energy){
                pm10_pm25_stage_max = 1;
            }
            else if(inner_ar[0] == inner_speed2_spend_time_energy){
                pm10_pm25_stage_max = 2;
            }
            else if(inner_ar[0] == inner_speed3_spend_time_energy){
                pm10_pm25_stage_max = 3;
            }
            else if(inner_ar[0] == inner_speed4_spend_time_energy){
                pm10_pm25_stage_max = 4;
            }
        }
        else{
            let voc_scale = (voc - voc_min) / (voc_max - voc_min);
            let co2_scale = (co2 - co2_min) / (co2_max - co2_min);

            let outer_group_max_scale = voc_scale > co2_scale ? voc_scale : co2_scale;

            let outer_speed1_spend_time_energy = speed1_outer_time * outer_group_max_scale * speed1_energy;
            let outer_speed2_spend_time_energy = speed2_outer_time * outer_group_max_scale * speed2_energy;
            let outer_speed3_spend_time_energy = speed3_outer_time * outer_group_max_scale * speed3_energy;
            let outer_speed4_spend_time_energy = speed4_outer_time * outer_group_max_scale * speed4_energy;

            let outer_ar = new Array();

            outer_ar.push(outer_speed1_spend_time_energy);
            outer_ar.push(outer_speed2_spend_time_energy);
            outer_ar.push(outer_speed3_spend_time_energy);
            outer_ar.push(outer_speed4_spend_time_energy);

            outer_ar.sort(function (a,b) {
                return a-b;
            });

            if(outer_ar[0] == outer_speed1_spend_time_energy){
                voc_co2_stage_max = 1;
            }
            else if(outer_ar[0] == outer_speed2_spend_time_energy){
                voc_co2_stage_max = 2;
            }
            else if(outer_ar[0] == outer_speed3_spend_time_energy){
                voc_co2_stage_max = 3;
            }
            else if(outer_ar[0] == outer_speed4_spend_time_energy){
                voc_co2_stage_max = 4;
            }
        }

        console.log('inner max : ' + pm10_pm25_stage_max + ', outer max : ' + voc_co2_stage_max);

        //민필규 - mode가 0일 때는 실내 공기 흡입모드, mode가 1일 때는 실외 공기 흡입모드 defalut = 0;
        let aircleaner_control_mode = 0;
        if(pm10_pm25_stage_max < voc_co2_stage_max){
            aircleaner_control_mode = 1;
        }

        if(aircleaner_control_mode != aircleaner.mode){
            aircleaner.mode = aircleaner_control_mode;
            // 밑에는 라즈베리파이가 http 통신으로 모드 변경 구현

        }

        let max = (pm10_pm25_stage_max > voc_co2_stage_max) ? pm10_pm25_stage_max : voc_co2_stage_max;
        
        //안유진 : 수면 모드
        if(solution_status.mode==4 && moment().format('HH')<='07' && max == 4){
            max = 3;
        }
        
        console.log(pm10_pm25_stage_max + " " + voc_co2_stage_max);

        if(max > speed){
            for (let i = 0; i < max - speed; i++) {
                command += aircleaner.control.speed_up + '&';
                aircleaner.speed++;
            }
        }

        else{
            for (let i = 0; i < speed - max; i++) {
                command += aircleaner.control.speed_down + '&';
                aircleaner.speed--;
            }
        }

        console.log(JSON.stringify(aircleaner));
    }
    else{

        if(aircleaner.power == 1){
            command += aircleaner.control.power + '&';
        }

        aircleaner.power = 0;
        aircleaner.speed = 1;
        console.log(JSON.stringify(aircleaner));
    }

    console.log(command);

    if(command != '?'){
        http.request({
            hostname : aircleaner_hostname,
            port : aircleaner_port,
            path: aircleaner_path + command
        }).end();
    }
  }

module.exports.Aircleaner_Power = Aircleaner_Power;
module.exports.Aircleaner_Speed_up = Aircleaner_Speed_up;
module.exports.Aircleaner_Speed_down = Aircleaner_Speed_down;
  
module.exports.Aircleaner_Speed = Aircleaner_Speed;

module.exports.Aircleaner_Send_command = Aircleaner_Send_command;

module.exports.control_aircleaner = control_aircleaner;