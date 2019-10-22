
const solution_status = require('../model/solution_status');

const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');

function mode_control() {
  if(solution_status.mode==1){ // 일반 모드

  }
  if(solution_status.mode==2){ //영유아모드

  }
  else if(solution_status.mode==3){ //노인모드

  }
}

module.exports = mode_control;
