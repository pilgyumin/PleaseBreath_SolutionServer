const BLUE = require('bluetooth-serial-port');
const btSerial = new BLUE.BluetoothSerialPort();
const fs = require('fs');
const BLUETOOTH_NAME = 'SEND_IR'
const BLUETOOTH_ADDRESS = '98:D3:71:FD:69:6D'
let CHECK = false;

btSerial.on('found', function(address, name) {
        if(!CHECK && address == BLUETOOTH_ADDRESS){
        CHECK = true;
            console.log('Found : Outdoor Air meter...');
                btSerial.connect(address, 1, function() {
                    console.log('Connect : Outdoor Air meter...');
                    btSerial.on('data', function(buffer) {
                        if(buffer.toString('utf-8') !=' '){
                            let Temperate = buffer.slice(0,2).toString('utf-8');
                            let Humid = buffer.slice(2,4).toString('utf-8');
                            console.log('Temperate : '+Temperate);
                            console.log('Humid : ' +Humid);
                            fs.appendFileSync('./Measured_data.txt',buffer.toString());
                            btSerial.close();
                        }
                    });
                },function(){
                    console.log('cannot connect');
                });

    
        } 
});
console.log('Outdoor Air meter...');
btSerial.inquireSync();
