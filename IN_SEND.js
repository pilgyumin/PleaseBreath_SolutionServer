const BLUE = require('bluetooth-serial-port');
const btSerial = new BLUE.BluetoothSerialPort();
const BLUETOOTH_NAME = 'KILJH'
const fs = require('fs')
let CHECK = false;

btSerial.on('found', function(address, name) {
        if(CHECK == false && name == BLUETOOTH_NAME){
        CHECK = true;
            console.log('Found : In Measurement...');
                btSerial.connect(address, 1, function() {
                    console.log('Connect : In Measurement.. ');
                    btSerial.on('data', function(buffer) {
                        if(buffer.toString('utf-8') !=' '){
                            let Temperate = buffer.slice(0,2).toString('utf-8');
                            let Humid = buffer.slice(2,4).toString('utf-8');
                            console.log('Temparte : '+Temperate);
                            console.log('Humid : ' +Humid);
                            fs.writeFileSync('./Measured_data.txt',buffer.toString());
                            btSerial.close();
                        }
                    });
                },function(){
                    console.log('cannot connect');
                });
    
        } 
});

console.log('IN Measure...');
btSerial.inquireSync();