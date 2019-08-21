const BLUE = require('bluetooth-serial-port');
let btSerial = new BLUE.BluetoothSerialPort();
const fs = require('fs');
const BLUETOOTH_ADDRESS = '98:D3:11:FD:25:0F'
let CHECK = false;

btSerial.on('found', function(address, name) {
        if(!CHECK && address == BLUETOOTH_ADDRESS){
        	CHECK = true;
                btSerial.connect(address, 1, function() {
					console.log('connect !');
                    btSerial.write(Buffer.from('48B7C837', 'utf-8'), function(err, bytesWritten) {
						if (err) console.log(err);
						console.log('48B7C837');
                        btSerial.close();
                    });
                    btSerial.on('data', function(buffer) {
                    });                    
                },function(){
                    console.log('cannot connect');
                });
            
        } 
});
console.log('Measured data transmit...');
btSerial.inquireSync();