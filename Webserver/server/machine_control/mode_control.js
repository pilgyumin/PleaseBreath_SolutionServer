
const solution_status = require('../model/solution_status');

const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');

const humidifier_status = require('../model/humidifier');
const humidifier_controler = require('../machine_control/humidifier_control');

const aircleaner_controler = require('../machine_control/aircleaner_control');
const aircleaner_status = require('../model/aircleaner');

const airconditioner_controler = require('../machine_control/airconditioner_control');
const airconditioner_status = require('../model/airconditioner');

const normal_airconditioner_algorithm = require('../machine_control/normal_mode/normal_airconditioner_algorithm');
const normal_aircleaner_algorithm = require('../machine_control/normal_mode/normal_aircleaner_algorithm');
function mode_control(temp_Outer,humid_Inner,pm10Inner,pm25Inner,vocInner,co2Inner) {
  if(solution_status.mode==1){ // 일반 모드
    normal_airconditioner_algorithm(temp_Outer,humid_Inner);
    normal_aircleaner_algorithm(pm10Inner,pm25Inner,vocInner,co2Inner);
  }
  else if(solution_status.mode==2){ //영유아모드

  }
  else if(solution_status.mode==3){ //노인모드
    //실내 습기 40% 이하
    if(status_Inner.humid_Inner < 40){
      if(humidifier_status.power == 0){
        humidifier_controler.Humidifier_Power();
      }
      humidifier_controler.Humidifier_Speed(3);
    }

    else if(status_Inner.humid_Inner > 50){
      if(humidifier_status.power == 1){
          humidifier_controler.Humidifier_Power();
      }
    }

    else{
      humidifier_controler.Humidifier_Speed(1);
    }
    
    //미세먼지
    if(status_Inner.pm10_Inner < 30 && status_Inner.pm25_Inner < 15){
      //최상의 상태
      if(aircleaner_status.power == 0){

      }


    }

  }
}

module.exports = mode_control;
