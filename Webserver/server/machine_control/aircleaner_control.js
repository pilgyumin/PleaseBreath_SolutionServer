const http = require('http');
const aircleaner = require('../model/aircleaner');
const aircleanerUrl = require('../url_Model/aircleaner_Url');

const aircleaner_hostname = '192.168.0.12';
const aircleaner_port = '3000';
const aircleaner_path = '?';

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
    aircleanerUrl.path += humidifier.control.power + '&';

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
        if(pm25 > 35 || pm10 > 70){
            pm10_pm25_stage_max = 4;
        }
        else if(pm25 > 25 || pm10 > 50){
            pm10_pm25_stage_max = 3;
        }
        else if(pm25 > 15 || pm10 > 30){
            pm10_pm25_stage_max = 2;
        }
        else if(pm25 > 5 || pm10 > 10){
            pm10_pm25_stage_max = 1;
        }
        else{
            pm10_pm25_stage_max = 0;
        }

        // 민필규 - voc,co2 단계 여부 파악
        if(voc > 2.200 || co2 > 2000){
            voc_co2_stage_max = 4;
        }
        else if(voc > 0.660 || co2 > 1000){
            voc_co2_stage_max = 3;
        }
        else if(voc > 0.220 || co2 > 700){
            voc_co2_stage_max = 2;
        }
        else if(voc > 0.111 || co2 > 400){
            voc_co2_stage_max = 1;
        }
        else{
            voc_co2_stage_max = 0;
        }

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