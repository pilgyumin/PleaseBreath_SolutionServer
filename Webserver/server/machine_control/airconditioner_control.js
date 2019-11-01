const airconditioner = require('../model/airconditioner');
const http = require('http');

const airconditioner_Url = require('../url_Model/airconditioner_Url');


/*
*  5 degrees lower than
*  the outside temperature.
*
*  if it is lower than 18C, set it to 18C
*
* */
function Airconditioner_Power(argv){
    //argv == 0 power off 
    //argv == 1 power on
    //전원키고 끄는 IR신호가 다르기 때문에 나누어서 신호 전달
    if(argv == 1){
        airconditioner.power = 1;
        airconditioner_Url.path += airconditioner.control.power + '&';
    }
    else if(argv == 0){
        airconditioner.power = 0;
        airconditioner_Url.path += airconditioner.control.poweroff + '&';
    }
}

function Airconditioner_Temp(argv,button){
    //argv - 희망온도
    //button - 0 임의설정
    //button 0일 경우 사용자가 냉방, 난방을 선택하고 온도를 선택한다.

    //button - 1 버튼 위로
    //button - 2 버튼 아래로
    //button 1일 경우 현재의 모드의 온도 + _Up의 요청을 보낸다.
    if(airconditioner.power == 1){
        if(button == 0){

            //cold15 , cold18 ...온도 지정
            //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3
            let Mode = argv.substring(0,4);
            if(Mode == 'cold')
                airconditioner.cold.temp = Number(argv.substring(4,6));
            else if(Mode == 'warm')
                airconditioner.warm.temp = Number(argv.substring(4,6));
            airconditioner_Url.path += argv + '&';

            /*if(airconditioner.mode == 'cold'){
                airconditioner.cold.temp = argv;
                airconditioner_Url.path += argv + '&';
            }
            else if(airconditioner.mode == 'warm'){
                airconditioner.warm.temp = argv;
                airconditioner_Url.path += argv + '&';
            }*/

        }
        else if(button == 1){
            //온도 조절 위로
            //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3
            if(airconditioner.mode == 0){
                let current_Temp = airconditioner.cold.temp;

                if(current_Temp != 32){
                    airconditioner.cold.temp++;
                    airconditioner_Url.path += 'cold'+ airconditioner.cold.temp + '&';

                }
            }

            else if(airconditioner.mode == 1){
                let current_Temp = airconditioner.warm.temp;

                if(current_Temp != 23){
                    airconditioner.warm.temp++;
                    airconditioner_Url.path += 'warm' + airconditioner.warm.temp + '&';
                }
            }

        }

        else if(button == 2){
            //온도 조절 아래로
            //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3
            if(airconditioner.mode == 0){
                let current_Temp = airconditioner.cold.temp;

                if(current_Temp != 18){
                    airconditioner.cold.temp--;
                    airconditioner_Url.path += 'cold'+ airconditioner.cold.temp-- + '&';

                }
            }

            else if(airconditioner.mode == 1){
                let current_Temp = airconditioner.warm.temp;

                if(current_Temp != 13){
                    airconditioner.warm.temp--;
                    airconditioner_Url.path += 'warm' + airconditioner.warm.temp-- + '&';
                }

            }
        }
    }
}



function Airconditioner_Speed(argv){
    //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3
    //속도 1 ~ 3
    
    if(airconditioner.power == 1){
        if(airconditioner.mode == 0){
            if(airconditioner.cold.speed != argv){
                airconditioner.cold.speed = argv;
                airconditioner_Url.path += "cspeed" + argv + '&';
            }
        }
        else if(airconditioner.mode == 1){
            if(airconditioner.warm.speed != argv){
                airconditioner.warm.speed = argv;
                airconditioner_Url.path += "wspeed" + argv + '&';
            }
        }
        else if(airconditioner.mode == 3){
            if(airconditioner.wind.speed != argv){
                airconditioner.wind.speed = argv;
                //에어컨 송풍일때 바람 IR전송
                airconditioner_Url.path += "sspeed" + argv + '&';
            }
        }
    }
}



function Airconditioner_Mode_Change(argv){
    //argv 0 1 2 3

    if(airconditioner.power == 1){
        if(airconditioner.mode != argv){
            let Mode;
            //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3
            if(argv == 0)
                Mode = 'cold';
            else if(argv == 1)
                Mode = 'warm';
            else if(argv == 2)
                Mode = 'dehumidify';
            else if(argv == 3)
                Mode = 'wind';

            airconditioner.mode = Number(argv);
            airconditioner_Url.path += Mode + '&';
        }
    }

}



function Airconditioner_Send_command(){

    if(airconditioner_Url.path != '?'){
        http.request(airconditioner_Url).end();
        airconditioner_Url.path = '?';
    }
}




function control_airconditioner(temp_Outer){
    console.log('airconditioner');
    if(airconditioner.power == 0){
        airconditioner_Url.path += airconditioner.control.power + '&';
        airconditioner.power = 1;
    }


    //if (temp_Outer-5 < 18) {
    //code for airconditioner.temp to 18
    //}
    //else {
    //code for airconditioner.temp to temp_Outer-5
    //}

    console.log(airconditioner_Url.path);
    console.log(JSON.stringify(airconditioner));

    if(airconditioner_Url.path != '?'){
        http.request(airconditioner_Url).end();
        airconditioner_Url.path = '?';
    }
}

module.exports.Airconditioner_Power = Airconditioner_Power;
module.exports.Airconditioner_Temp = Airconditioner_Temp;
module.exports.Airconditioner_Speed = Airconditioner_Speed;
module.exports.Airconditioner_Mode_Change = Airconditioner_Mode_Change;
module.exports.Airconditioner_Send_command = Airconditioner_Send_command;
module.exports.control_airconditioner =control_airconditioner;