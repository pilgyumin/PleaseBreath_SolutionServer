
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


const pm10_max = 200;
const pm25_max = 255;
const voc_max = 2.0;
const co2_max = 2000;

const pm10_min = 0;
const pm25_min = 0;
const voc_min = 0;
const co2_min = 400;

const pm10_influence_weight = 0.25;
const pm25_influence_weight = 0.25;
const voc_influence_weight = 0.25;
const co2_influence_weight = 0.25;

let inner_count = 0;
let outer_count = 0;

let pm10_ar = new Array();
let pm25_ar = new Array();
let voc_ar = new Array();
let co2_ar = new Array();

let ar_len = 0;

module.exports.aircleaner_algorithm = function aircleaner_algorithm(pm10,pm25,voc,co2) {

    const http = require('http');

    const aircleaner_status = require('../model/aircleaner');
    const aircleaner_control = require('../machine_control/aircleaner_control');
    const motor_hostname = '192.168.1.9';
    const motor_port = '3000';
    const motor_path = '?';

    console.log('aircleaner_algorithm');

    pm10_ar[ar_len] = pm10;
    pm25_ar[ar_len] = pm25;
    voc_ar[ar_len] = voc;
    co2_ar[ar_len] = co2;
    ar_len++;

    let pm10_scale = (pm10 - pm10_min) / (pm10_max - pm10_min);
    let pm25_scale = (pm25 - pm25_min) / (pm25_max - pm25_min);
    let voc_scale = (voc - voc_min) / (voc_max - voc_min);
    let co2_scale = (co2 - co2_min) / (co2_max - co2_min);

    let inner_scale = (pm10_influence_weight * pm10_scale) + (pm25_influence_weight * pm25_scale);
    let outer_scale = (voc_influence_weight * voc_scale) + (co2_influence_weight * co2_scale);

    if(inner_scale > outer_scale){
        inner_count++;
    }

    else{
        outer_count++;
    }

    if(inner_count + outer_count == 9){

        if(inner_count > outer_count){
            if(aircleaner_status.mode != 0){
                aircleaner_status.mode = 0;
                http.request({
                    hostname : motor_hostname,
                    port : motor_port,
                    path: motor_path + 'inner'
                }).end();
            }
            let pm25_average = 0;
            let pm10_average = 0;
            for(let i = 0; i < 9; i++){
                pm25_average += pm25_ar[i];
                pm10_average += pm10_ar[i];
            }
            pm25_average /= 9;
            pm10_average /= 9;
            aircleaner_control.control_aircleaner(pm10_average,pm25_average,0,0);
        }
        else{
            if(aircleaner_status.mode != 1){
                aircleaner_status.mode = 1;
                http.request({
                    hostname : motor_hostname,
                    port : motor_port,
                    path: motor_path + 'outer'
                }).end();
            }
            let voc_average = 0;
            let co2_average = 0;
            for(let i = 0; i < 9; i++){
                voc_average += voc_ar[i];
                co2_average += co2_ar[i];
            }
            voc_average /= 9;
            co2_average /= 9;
            aircleaner_control.control_aircleaner(0,0,voc_average,co2_average);
        }
        inner_count = outer_count = ar_len = 0;
    }
}