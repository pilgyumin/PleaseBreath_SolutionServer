const humidifier = require('../model/humidifier');
const http = require('http');

const humidifierUrl = require('../url_Model/humidifier_Url');

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
function test(){
    return 1;
}
function Humidifier_Power(){
    humidifier.power = 1 - humidifier.power;
    humidifierUrl.path += humidifier.control.power + '&';
    /*if(humidifierUrl.path != '?'){
        http.request(humidifierUrl).end();
        humidifierUrl.path = '?';
    }*/
}
function Humidifier_Speed_up(){
    if(humidifier.speed < 8){
        humidifier.speed += 1;
        humidifierUrl.path += humidifier.control.speed_up + '&';
        
    }
    
}

function Humidifier_Speed_down(){    
    if(humidifier.speed > 1){
        humidifier.speed -= 1;
        humidifierUrl.path += humidifier.control.speed_down + '&';
        /*if(humidifierUrl.path != '?'){
            http.request(humidifierUrl).end();
            humidifierUrl.path = '?';
        }*/
        return;
    }
}
function Humidifier_Speed(argv){
    if(humidifier.speed > argv){
        let i = humidifier.speed
        for(i; i >= argv; i--)
            this.Humidifier_Speed_down();    
    }

    else if(humidifier.speed < argv){
        let i = humidifier.speed
        for(i; i <= argv; i++){
            this.Humidifier_Speed_up();    
        }
    }

}

function Humidifier_Send_command(){

    if(humidifierUrl.path != '?'){
        http.request(humidifierUrl).end();
        humidifierUrl.path = '?';
    }
}

function ctrlHumidifier(temp){
    console.log('humidifier');

    if(humidifier.humid <= 70){

        if(humidifier.power == 0){
            humidifierUrl.path += humidifier.control.power + '&' + humidifier.control.humid + '&';
            humidifier.power = 1;
        }

        let goalHumid = 0;

        if (temp >= 24) {
            goalHumid = temp24Humid;
        }

        else if (temp >= 21) {
            goalHumid = temp2123Humid;
        }

        else if (temp >= 18) {
            goalHumid = temp1820Humid;
        }

        else {
            goalHumid = temp1517Humid;
        }

        if(goalHumid >= humidifier.humid){
            console.log(goalHumid - humidifier.humid);
            for(let i = 0; i < goalHumid - humidifier.humid; i += 5){

                humidifierUrl.path += humidifier.control.humid + '&';
            }
        }

        else{
            console.log(90 - humidifier.humid + (goalHumid - 30));
            for(let i = 0; i < 90 - humidifier.humid + (goalHumid - 30); i += 5){
                humidifierUrl.path += humidifier.control.humid + '&';
            }
        }

        let speed = humidifier.speed;


        if(goalHumid - humidifier.humid >= 30){
            while(speed != 2){
                humidifierUrl.path += humidifier.control.speed + '&';
                speed = (speed + 1) % 3 ;
            }
        }

        else if(goalHumid - humidifier.humid >= 20){
            while(speed != 1){
                humidifierUrl.path += humidifier.control.speed + '&';
                speed = (speed + 1) % 3 ;
            }
        }
        
        else {
            while(speed != 0){
                humidifierUrl.path += humidifier.control.speed + '&';
                speed = (speed + 1) % 3 ;
            }
        }

        humidifier.speed = speed;
        humidifier.humid = goalHumid;

        console.log(humidifierUrl.path);
        console.log(JSON.stringify(humidifier));

        if(humidifierUrl.path != '?'){
            http.request(humidifierUrl).end();
            humidifierUrl.path = '?';
        }
    }

}

module.exports.Humidifier_Power = Humidifier_Power;
module.exports.ctrlHumidifier = ctrlHumidifier;
module.exports.Humidifier_Send_command = Humidifier_Send_command;

module.exports.Humidifier_Speed = Humidifier_Speed;
module.exports.Humidifier_Speed_up = Humidifier_Speed_up;
module.exports.Humidifier_Speed_down = Humidifier_Speed_down;