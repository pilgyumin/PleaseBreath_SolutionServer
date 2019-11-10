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
    if(humidifier.power == 0)
        humidifier.speed = 1;
    
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
        for(i; i > argv; i--)
            this.Humidifier_Speed_down();    
    }

    else if(humidifier.speed < argv){
        let i = humidifier.speed
        for(i; i < argv; i++){
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

function ctrlHumidifier(temp,humid_Inner){
    console.log('humidifier');

    let goal_Humid = 0;

    if (temp >= 24) {
        goal_Humid = temp24Humid;
    }

    else if (temp >= 21) {
        goal_Humid = temp2123Humid;
    }

    else if (temp >= 18) {
        goal_Humid = temp1820Humid;
    }

    else {
        goal_Humid = temp1517Humid;
    }
    console.log('goal humid : ' + goal_Humid + ', humid inner : ' + humid_Inner);
    if(goal_Humid > humid_Inner){

        if(humidifier.power == 0){
            this.Humidifier_Power();
            humidifier.power = 1;
        }

        let different_goal_humid_inner_humid = goal_Humid - humid_Inner;
        if(different_goal_humid_inner_humid >= 70){
            this.Humidifier_Speed(8);
            humidifier.speed = 8;
        }
        else if(different_goal_humid_inner_humid >= 60){
            this.Humidifier_Speed(7);
            humidifier.speed = 7;
        }
        else if(different_goal_humid_inner_humid >= 50){
            this.Humidifier_Speed(6);
            humidifier.speed = 6;
        }
        else if(different_goal_humid_inner_humid >= 40){
            this.Humidifier_Speed(5);
            humidifier.speed = 5;
        }
        else if(different_goal_humid_inner_humid >= 30){
            this.Humidifier_Speed(4);
            humidifier.speed = 4;
        }
        else if(different_goal_humid_inner_humid >= 20){
            this.Humidifier_Speed(3);
            humidifier.speed = 3;
        }
        else if(different_goal_humid_inner_humid >= 10){
            this.Humidifier_Speed(2);
            humidifier.speed = 2;
        }
        else{
            this.Humidifier_Speed(1);
            humidifier.speed = 1;
        }

        this.Humidifier_Send_command();
    }
    else{
        if(humidifier.power == 1){
            this.Humidifier_Power();
            humidifier.power = 0;
        }
        this.Humidifier_Send_command();
    }
    console.log(JSON.stringify(humidifier));
    console.log('humidifier end');
}

module.exports.Humidifier_Power = Humidifier_Power;
module.exports.ctrlHumidifier = ctrlHumidifier;
module.exports.Humidifier_Send_command = Humidifier_Send_command;

module.exports.Humidifier_Speed = Humidifier_Speed;
module.exports.Humidifier_Speed_up = Humidifier_Speed_up;
module.exports.Humidifier_Speed_down = Humidifier_Speed_down;