// 민필규
const http = require('http');
const airconditioner_Url = require('../url_Model/airconditioner_Url');
const airconditioner_status = require('../model/airconditioner');

module.exports.normal_airconditioner_algorithm = function normal_airconditioner_algorithm(temp_Outer, humid_Inner){


    //에어컨 제어



    console.log('[normal mode] airconditioner control');

    let goal_temp_Inner = 0;
    let airconditioner_add_url = '';

    // AI모드 일 때
    if(airconditioner_status.detail_mode === 1){
        // 목표 온도 설정
        if (temp_Outer-5 < 18) {
            //code for airconditioner.temp to 18
            goal_temp_Inner = 18;
        }

        else {
            //code for airconditioner.temp to temp_Outer-5
            goal_temp_Inner = temp_Outer - 5;
        }
        console.log(goal_temp_Inner);
        // 목표 모드 설정(냉방 / 난방)
        if(temp_Outer < 10){
            // 난방 모드로 변경
            if(airconditioner_status.mode != 1){
                airconditioner_status.mode = 1;
                airconditioner_add_url += 'warm&';
            }

        }
        else{
            // 냉방 모드로 변경
            if(airconditioner_status.mode != 0) {
                airconditioner_status.mode = 0;
                airconditioner_add_url += 'cold&';
            }
        }

        if(airconditioner_status.mode === 0){
            if(goal_temp_Inner != airconditioner_status.cold.temp){

                if(airconditioner_status.power == 0){
                    airconditioner_add_url += 'power&';
                    airconditioner_status.power = 1;
                }

                airconditioner_status.cold.temp = goal_temp_Inner;
                switch(goal_temp_Inner){
                    case 18:
                        airconditioner_add_url += 'cold18&';
                        break;
                    case 19:
                        airconditioner_add_url += 'cold19&';
                        break;
                    case 20:
                        airconditioner_add_url += 'cold20&';
                        break;
                    case 21:
                        airconditioner_add_url += 'cold21&';
                        break;
                    case 22:
                        airconditioner_add_url += 'cold22&';
                        break;
                    case 23:
                        airconditioner_add_url += 'cold23&';
                        break;
                    case 24:
                        airconditioner_add_url += 'cold24&';
                        break;
                    case 25:
                        airconditioner_add_url += 'cold25&';
                        break;
                    case 26:
                        airconditioner_add_url += 'cold26&';
                        break;
                    case 27:
                        airconditioner_add_url += 'cold27&';
                        break;
                    case 28:
                        airconditioner_add_url += 'cold28&';
                        break;
                    case 29:
                        airconditioner_add_url += 'cold29&';
                        break;
                    case 30:
                        airconditioner_add_url += 'cold30&';
                        break;
                    case 31:
                        airconditioner_add_url += 'cold31&';
                        break;
                    case 32:
                        airconditioner_add_url += 'cold32&';
                        break;
                }
            }
            else{
                control_humid();
            }
        }
        else{
            if(goal_temp_Inner != airconditioner_status.warm.temp){

                if(airconditioner_status.power == 0){
                    airconditioner_add_url += 'power&';
                    airconditioner_status.power = 1;
                }

                airconditioner_status.warm.temp = goal_temp_Inner;

                switch(goal_temp_Inner){
                    case 13:
                        airconditioner_add_url += 'warm13&';
                        break;
                    case 14:
                        airconditioner_add_url += 'warm14&';
                        break;
                    case 15:
                        airconditioner_add_url += 'warm15&';
                        break;
                    case 16:
                        airconditioner_add_url += 'warm16&';
                        break;
                    case 17:
                        airconditioner_add_url += 'warm17&';
                        break;
                    case 18:
                        airconditioner_add_url += 'warm18&';
                        break;
                    case 19:
                        airconditioner_add_url += 'warm19&';
                        break;
                    case 20:
                        airconditioner_add_url += 'warm20&';
                        break;
                    case 21:
                        airconditioner_add_url += 'warm21&';
                        break;
                    case 22:
                        airconditioner_add_url += 'warm22&';
                        break;
                    case 23:
                        airconditioner_add_url += 'warm23&';
                        break;
                }
            }
            else{
                control_humid();
            }
        }

    }

    else{
        control_humid();
    }

    http.request({
        hostname : airconditioner_Url.hostname,
        port : airconditioner_Url.port,
        path : airconditioner_Url.path + airconditioner_add_url
    }).end();

    function control_humid() {
        const temp1517Humid = 70;
        const temp1820Humid = 60;
        const temp2123Humid = 50;
        const temp24Humid = 40;

        let goalHumid = 0;

        if (goal_temp_Inner >= 24) {
            goalHumid = temp24Humid;
        }

        else if (goal_temp_Inner >= 21) {
            goalHumid = temp2123Humid;
        }

        else if (goal_temp_Inner >= 18) {
            goalHumid = temp1820Humid;
        }

        else {
            goalHumid = temp1517Humid;
        }

        if(humid_Inner > goalHumid){

            if(airconditioner_status.power == 0){
                airconditioner_add_url += airconditioner_status.control.power + '&';
                airconditioner_status.power = 1;
            }

            if(airconditioner_status.mode != 2){
                airconditioner_status.mode = 2;
                airconditioner_add_url += 'dehumidify&';
            }
        }

        else if(humid_Inner < goalHumid){

            if(airconditioner_status.power == 1){
                airconditioner_add_url += 'poweroff&';
                airconditioner_status.power = 0;
            }

        }
    }
    console.log('aircon end');
}