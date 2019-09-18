const humidifier = require('../model/humidifier');

let humidifierUrl = {
    hostname: 'localhost',
    port: '3000',
    path : '?'
};

const temp1517Humid = 70;
const temp1820Humid = 60;
const temp2123Humid = 50;
const temp24Humid = 40;
/*
*  온도별 적정 습도
*  15도 ~ 17도 - 70%
*  18도 ~ 20도 - 60%
*  21도 ~ 23도 - 50%
*  24도 이상 = 40%
* */


/*
* 기기 default
*  시작 습도 : 40rh
*  시작 세기 : 1
* */
function ctrlHumidifier(temp,humidity){
    if(humidity < 40){
        if(humidifier.power == 0){
            humidifierUrl.path += humidifier.control.ctrlpower + '&';
            humidifier.power = 1;
        }

        let goalHumid = 0;

        if(temp >= 24){
            goalHumid = temp24Humid;
        }
        else if(temp >= 21){
            goalHumid = temp2123Humid;
        }
        else if(temp >= 18){
            goalHumid = temp1820Humid;
        }
        else {
            goalHumid = temp1517Humid;
        }

        for(let i = 0; i < goalHumid - humidity; i += 5){
            humidifierUrl.path += humidifier.control.ctrlhumid + '&';
        }

        if(goalHumid - humidity >= 30){
            let speed = humidifier.speed;
            for(let command = 0; command < 2-speed; command++) {
                humidifierUrl.path += humidifier.control.ctrlspeed + '&';
            }
            humidifier.speed = 3;
        }

        else if(goalHumid - humidity >= 20){
            let speed = humidifier.speed;
            for(let command = 0; command < 1-speed; command++) {
                humidifierUrl.path += humidifier.control.ctrlspeed + '&';
            }
            humidifier.speed = 2;
        }

        humidifier.humid = goalHumid;
    }

}

module.exports = ctrlHumidifier;