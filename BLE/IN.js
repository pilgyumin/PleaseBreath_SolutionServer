const BLUE = require('bluetooth-serial-port');
const btSerial = new BLUE.BluetoothSerialPort();
const BLUETOOTH_NAME = 'KILJH'
const BLUETOOTH_ADDRESS = '98:D3:31:F5:34:DE'
const fs = require('fs')
let CHECK = false;

btSerial.on('found', function(address, name) {
        if(CHECK == false && address == BLUETOOTH_ADDRESS){
        CHECK = true;
            console.log('Found : Indoor Air meter...');
                btSerial.connect(address, 1, function() {
                    console.log('Connect : Indoor Air meter.. ');
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

console.log('Indoor Air meter....');
btSerial.inquireSync();