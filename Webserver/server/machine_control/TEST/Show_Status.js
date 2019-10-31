const status_Inner = require('../../model/status_Inner');
const status_Outer = require('../../model/status_Outer');
const humidfier = require('../../model/humidifier')
const airconditioner = require('../../model/airconditioner')
const aircleaner = require('../../model/aircleaner')
module.exports.Show_Status = function Show_Status(){

    console.log("Status_Inner");
    console.log(status_Inner);
    console.log("Status_Outer");
    console.log(status_Outer);
    console.log("humidifier");
    console.log("Power : " + humidfier.power);
    console.log("speed : " + humidfier.speed);
    console.log("airconditioner");
    console.log("Power : " + airconditioner.power);
    console.log("detail_mode : " + airconditioner.detail_mode);
    
    if(airconditioner.mode == 0){
        console.log("mode : cold");
        console.log("speed : " + airconditioner.cold.speed);
        console.log("temp : " + airconditioner.cold.temp);
    }
    else if(airconditioner.mode == 1){
        console.log("mode : warm");
        console.log("speed : " + airconditioner.warm.speed);
        console.log("temp : " + airconditioner.warm.temp);
    }
    
    else if(airconditioner.mode == 2){
        console.log("mode : dehumidify");
        console.log("speed : " + airconditioner.wind.speed);
    }

    else if(airconditioner.mode == 3){
        console.log("mode : wind");
        console.log("speed : " + airconditioner.wind.speed);
    }

    console.log("aircleaner");
    console.log("Power : " + aircleaner.power);
    console.log("speed : " + aircleaner.speed);

}
