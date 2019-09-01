const http = require('http');
const fs = require('fs');
var text = fs.readFileSync('./Measured_data.txt','utf-8');
var Temp1 = text.slice(0,2);
var Humid1 = text.slice(2,4);
var Temp2 = text.slice(4,6);
var Humid2 = text.slice(6,8);
let path = '/main?tempOuter='+Temp1+'&humidOuter='+Humid1;
let path2 = '/main?tempInner='+Temp2+'&humidInner='+Humid2
    const options = {
        hostname : '192.168.0.2',
        port : '80',
        path : path
    }

    const options2 = {
        hostname : '192.168.0.2',
        port : '80',
        path : path2
    }

    function handleResponse(response){
            response.on('data',function(chunk){
            });
            response.on('end',function(){
            });
    }

    http.request(options, function(response){
        handleResponse(response);
    }).end();

    http.request(options2, function(response){
        handleResponse(response);
    }).end();
