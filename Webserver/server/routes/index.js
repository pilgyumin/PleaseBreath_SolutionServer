const express = require('express');
const http = require('http');
const router = express.Router();

let aircleaner = {
    hostname: '192.168.0.7',
    port: '3000',
    path : '?'
};

let humidifier = {
    hostname: 'localhost',
    port: '3000',
    path : '?'
};
let airconditioner = {
    hostname: '192.168.0.7',
    port: '3000',
    path : '?'
};

let webserver = {
    hostname: 'localhost',
    port: '80',
    path : '/insertdb?'
};

router.get('', (req, res, next) => {

    //temp
    if(req.query.tempOuter){
        let tOut = req.query.tempOuter.split(".");
        webserver.path += 'tempOuter='+tOut[0];
        console.log("tempOuter : " + tOut[0]);
        if(tOut[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            // http.request(airconditioner).end();
        }
    }

    if(req.query.tempInner){
        let tIn = req.query.tempInner.split(".");
        webserver.path += 'tempInner='+tIn[0];
        console.log("tempInner : " + tIn[0]);
        if(tIn[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //http.request(airconditioner).end();
        }
    }

    //humid
    if(req.query.humidOuter){
        let hOut = req.query.humidOuter.split(".");
        webserver.path += 'humidOuter='+hOut[0];
        console.log("humidOuter : " + hOut[0]);
        if(hOut[0] > 3){
            console.log("humidifier On!");
            humidifier.path += '0x48B7C837';
            console.log(humidifier.path);
            // http.request(humidifier).end();
        }
    }

    if(req.query.humidInner){
        let hIn = req.query.humidInner.split(".");
        webserver.path += 'humidInner='+hIn[0];
        console.log("humidInner : " + hIn[0]);
        if(hIn[0] > 3){
            console.log("humidifier On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //  http.request(airconditioner).end();
        }
    }

    //pm10
    if(req.query.pm10Outer){
        let p10Out = req.query.pm10Outer.split(".");
        webserver.path += 'pm10Outer='+p10Out[0];
        console.log("pm10Outer : " + p10Out[0]);
        if(p10Out[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //  http.request(airconditioner).end();
        }
    }

    if(req.query.pm10Inner){
        let p10In = req.query.pm10Inner.split(".");
        webserver.path += 'pm10Inner='+p10In[0];
        console.log("pm10Inner : " + p10In[0]);
        if(p10In[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //  http.request(airconditioner).end();
        }
    }

    //pm2.5
    if(req.query.pm25Outer){
        let p25Out = req.query.pm25Outer.split(".");
        webserver.path += 'pm25Outer='+p25Out[0];
        console.log("pm25Outer : " + p25Out[0]);
        if(p25Out[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //   http.request(airconditioner).end();
        }
    }

    if(req.query.pm25Inner){
        let p25In = req.query.pm25Inner.split(".");
        webserver.path += 'pm25Inner='+p25In[0];
        console.log("pm25Inner : " + p25In[0]);
        if(p25In[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //   http.request(airconditioner).end();
        }
    }

    //voc
    if(req.query.vocOuter){
        let vOut = req.query.vocOuter.split(".");
        webserver.path += 'vocOuter='+vOut[0];
        console.log("vocOuter : " + vOut[0]);
        if(vOut[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //   http.request(airconditioner).end();
        }
    }

    if(req.query.vocInner){
        let vIn = req.query.vocInner.split(".");
        webserver.path += 'vocInner='+vIn[0];
        console.log("vocInner : " + vIn[0]);
        if(vIn[0] > 3){
            console.log("Aircon On!");
            airconditioner.path += '0x48B7C837';
            console.log(airconditioner.path);
            //   http.request(airconditioner).end();

        }
    }

    http.request(webserver).end();
    webserver.path = '/insertdb?';
    airconditioner.path = '?';
    humidifier.path = '?';
    aircleaner.path = '?';

    res.json(JSON.stringify(webserver));
});

module.exports = router;
