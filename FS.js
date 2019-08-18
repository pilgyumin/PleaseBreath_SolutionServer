const fs = require('fs');
var text = fs.readFileSync('./Measured_data.txt','utf-8');
const BLUE = require('bluetooth-serial-port');
let btSerial = new BLUE.BluetoothSerialPort();
const arSerial = new BLUE.BluetoothSerialPort();
const http = require('http');
const BLUETOOTH_NAME = 'SEND_IR'
const BLUETOOTH_ADDRESS = '98:D3:11:FD:25:0F';


btSerial.on('found', function(address, name) {
        if(!CHECK && name == BLUETOOTH_ADDRESS){
        CHECK = true;
            btSerial.findSerialPortChannel(address, function(channel) {
                btSerial.connect(address, channel, function() {



                    btSerial.write(Buffer.from('1', 'utf-8'), function(err, bytesWritten) {
                        if (err) console.log(err);
                    });
                    btSerial.on('data', function(buffer) {
                    });

                    
                },function(){
                    console.log('cannot connect');
                });
            });
        } 
});
console.log('Measured data transmit...');
btSerial.inquireSync();