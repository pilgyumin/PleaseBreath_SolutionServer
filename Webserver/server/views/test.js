var moment = require('moment');
require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

let year = moment().year();
let month = moment().month() + 1;
let date = moment().date();
let hours = moment().hours();
let minute = moment().minute();
let second = moment().seconds();


console.log(`연도 => ${moment().year()}`)     
//연도 => 2018
console.log(`월 (※ 0〜11의 값) => ${moment().month()}`)     
//월 (※ 0〜11의 값) => 0
console.log(`일 => ${moment().date()}`)      
//일 => 15
console.log(`시 => ${moment().hours()}`)     
//시 => 10
console.log(`분 => ${moment().minutes()}`)   
//분 => 57
console.log(`초 => ${moment().seconds()}`)   
//초 => 2
