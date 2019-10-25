const airconditioner = {
    power : 0,
    mode : '',  //wart, cold, dehumidify, wind
    warm : {
        speed : 1,
        temp : 13
    },
    wind : {
        speed : 1
    },
    cold : {
        speed : 1,
        temp : 18
    },
    
    control : {
        power : 'power',
        //change_mode : 'changemode',
        //mode : '',
        //warm : 'warm',
        //cold : 'cold',
        //dehumidify : 'dehumidify', // 제습
        //wind : 'wind', // 송풍
        //speed : 'strength',
        coldtemp18 : 'coldtemp18',
        coldtemp19 : 'coldtemp19',
        coldtemp20 : 'coldtemp20',
        coldtemp21 : 'coldtemp21',
        coldtemp22 : 'coldtemp22',
        coldtemp23 : 'coldtemp23',
        coldtemp24 : 'coldtemp24',
        coldtemp25 : 'coldtemp25',
        coldtemp26 : 'coldtemp26',
        coldtemp27 : 'coldtemp27',
        coldtemp28 : 'coldtemp28',
        coldtemp29 : 'coldtemp29',
        coldtemp30 : 'coldtemp30',
        coldtemp31 : 'coldtemp31',
        coldtemp32 : 'coldtemp32',

        warttemp13 : 'warttemp13',
        warttemp14 : 'warttemp14',
        warttemp15 : 'warttemp15',
        warttemp16 : 'warttemp16',
        warttemp17 : 'warttemp17',
        warttemp18 : 'warttemp18',
        warttemp19 : 'warttemp19',
        warttemp20 : 'warttemp20',
        warttemp21 : 'warttemp21',
        warttemp22 : 'warttemp22',
        warttemp23 : 'warttemp23'
    }
}

module.exports = airconditioner;