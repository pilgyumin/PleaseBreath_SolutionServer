const BLUE = require('bluetooth-serial-port');
let btSerial = new BLUE.BluetoothSerialPort();
const fs = require('fs');
const BLUETOOTH_ADDRESS = '98:D3:11:FD:25:0F'
let CHECK = false;

btSerial.on('found', function(address, name) {
        if(!CHECK && address == BLUETOOTH_ADDRESS){
        	CHECK = true;
                btSerial.connect(address, 1, function() {
					console.log('connect : Transmit...');
                    btSerial.write(Buffer.from('1', 'utf-8'), function(err, bytesWritten) {
						if (err) console.log(err);
						console.log('Tran Data!');
                        btSerial.close();
                    });
                    btSerial.close();
                },function(){
                    console.log('cannot connect');
                });
            
        } 
});
console.log('Measured data transmit...');
btSerial.inquireSync();