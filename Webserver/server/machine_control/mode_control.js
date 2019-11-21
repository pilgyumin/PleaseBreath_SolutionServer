const solution_status = require('../model/solution_status');

const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');

const humidifier_status = require('../model/humidifier');
const humidifier_controler = require('../machine_control/humidifier_control');

const aircleaner_controler = require('../machine_control/aircleaner_control');
const aircleaner_status = require('../model/aircleaner');

const airconditioner_controler = require('../machine_control/airconditioner_control');
const airconditioner_status = require('../model/airconditioner');

const normal_airconditioner_algorithm = require('./normal_airconditioner_algorithm');
const aircleaner_algorithm = require('../machine_control/aircleaner_algorithm');

const Show_Status = require('./TEST/Show_Status');
function mode_control(temp_Outer,temp_Inner,humid_Inner,pm10Inner,pm25Inner,vocInner,co2Inner) {
  console.log('aircleaner_control');
  //모드에 상관없이 공기청정기 알고리즘 가동
  console.log(pm10Inner);
  aircleaner_algorithm.aircleaner_algorithm(pm10Inner, pm25Inner, vocInner, co2Inner);
  console.log('mode_control');

  if (solution_status.mode == 1) { // 일반 모드
    console.log('normal');

    normal_airconditioner_algorithm.normal_airconditioner_algorithm(temp_Outer,temp_Inner,humid_Inner);
    humidifier_controler.ctrlHumidifier(temp_Inner,humid_Inner);


  } else if (solution_status.mode == 2) { //영유아모드
    console.log('infants');

    //실내 온도 22도 고정
    if (airconditioner_status.power == 0) {
      airconditioner_controler.Airconditioner_Power();
    }
    if(airconditioner_status.warm.temp!=22 && airconditioner_status.cold.temp!=22)
    {
      if(status_Outer.temp_Outer<10){//난방 22도
          airconditioner_controler.Airconditioner_Mode_Change(1);
          airconditioner_controler.Airconditioner_Temp("warm22",0);
      }
      else {//냉방 22도
          airconditioner_controler.Airconditioner_Mode_Change(0);
          airconditioner_controler.Airconditioner_Temp("cold22",0);
      }
    }

    //실내 습도 50% 고정
    if (status_Inner.humid_Inner < 50) { // 습도 50미만일 경우
      if (humidifier_status.power == 0) {//가습기 켜기
        humidifier_controler.Humidifier_Power();
      } //제습기는 알이서 꺼져있을 것 : 왜냐면 앞에 온도조절에서 에어컨 모드를 바꿨으니깐
    }
    if (status_Inner.humid_Inner > 55) { // 습도 55초과일 경우
      if (humidifier_status.power == 1) {//가습기 끄기

        humidifier_controler.Humidifier_Power();

      }
      if (airconditioner_status.mode != 2) {//제습기 켜기
        airconditioner_controler.Airconditioner_Mode_Change(2);
      }
    }
  }

  else if (solution_status.mode == 3) { //노인모드
    //실내 습기 40% 이하
    console.log('Senior Mode');
    console.log('Current Status');
    Show_Status.Show_Status();
    console.log('Humid Control');
    if (status_Inner.humid_Inner < 40) {
      if (humidifier_status.power == 0) {
        humidifier_controler.Humidifier_Power();
      }
      if(humidifier_status.speed!=3)
        humidifier_controler.Humidifier_Speed(3);
    }

    else if (status_Inner.humid_Inner > 50) {
      if (humidifier_status.power == 1) {
        humidifier_controler.Humidifier_Power();
      }
    }

    else {
      if(Humidifier_Speed != 1)
        humidifier_controler.Humidifier_Speed(1);
    }

    //humidifier_controler.Humidifier_Send_command();
    Show_Status.Show_Status();
    console.log('Temp Control');

    //온도
    if (airconditioner_status.power == 0) {
      airconditioner_controler.Airconditioner_Power();
      console.log('Airconditioner Power on');
    }
    if (status_Inner.temp_Inner >= 26 && status_Inner.temp_Inner <= 28) {
      //적정 상태
      console.log("Current Temp Normal.. ");
    }
    else if (status_Inner.temp_Inner < 25) {
      //낮은 기온
      console.log('Current Temp cold');
      if(airconditioner_status.mode != 1){
        console.log('Mode Change');
        airconditioner_controler.Airconditioner_Mode_Change(1);
      }
      if(airconditioner_status.warm.temp !=22)
        airconditioner_controler.Airconditioner_Temp("warm22",0);
      console.log('Temp Change');
    }
    else if (status_Inner.temp_Inner > 29) {
      //높은 기온
      if(airconditioner_status.mode != 0)
        airconditioner_controler.Airconditioner_Mode_Change(0);
      if(airconditioner_status.cold.temp != 22)
        airconditioner_controler.Airconditioner_Temp("cold22",0);

      //aircleaner_controler.Aircleaner_Send_command();
    }
    Show_Status.Show_Status();
    Show_Status.Show_Command();









/*
    //미세먼지
    if (status_Inner.pm10_Inner < 30 && status_Inner.pm25_Inner < 15) {
      //최상의 상태
      if (aircleaner_status.power == 1) {
        aircleaner_controler.Aircleaner_Power();
        aircleaner_status.power = 0;
      }
      console.log("Current Pm Best.. Power Off");


    }
    //최악의 상태
    else if (status_Inner.pm10_Inner >= 81 || status_Inner.pm25_Inner >= 36) {
      if (aircleaner_status.power == 0) {
        aircleaner_status.power = 1;
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Pm worst.. Power On");
      aircleaner_controler.Aircleaner_Speed(4);

    }
    //적정 상태
    else if (status_Inner.pm10_Inner <= 80 || status_Inner.pm25_Inner <= 35) {
      if (aircleaner_status.power == 0) {
        aircleaner_status.power = 1;
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Pm Normal.. Power On");
      aircleaner_controler.Aircleaner_Speed(2);
    }

    //aircleaner_controler.Aircleaner_Send_command();


    //온도
    if (status_Inner.temp_Inner >= 26 && status_Inner.temp_Inner <= 28) {
      //적정 상태
      if (airconditioner_status.power == 0) {
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Temp Normal.. ");
      aircleaner_controler.Aircleaner_Speed(0);
    } else if (status_Inner.temp_Inner < 25) {
      //낮은 기온
      aircleaner_controler.Aircleaner_Speed(0);
    } else if (status_Inner.temp_Inner > 29) {
      //높은 기온
      aircleaner_controler.Aircleaner_Speed(0);

      aircleaner_controler.Aircleaner_Send_command();


    console.log('Return');
    Show_Status.Show_Status();*/


  } else if (solution_status.mode == 4) { // 수면 모드
    console.log('sleep');
    //밤에 공청기 세기 낮추는것 이외의 기능은 일반모드와 동일할 예정
    //normal_airconditioner_algorithm.normal_airconditioner_algorithm(temp_Outer,humid_Inner);
    //humidifier_controler.ctrlHumidifier(temp_Inner);

  }
}

module.exports = mode_control;
