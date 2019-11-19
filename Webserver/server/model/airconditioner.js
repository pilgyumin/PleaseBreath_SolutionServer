const airconditioner = {
    power : 0,
    detail_mode : 1,  //User == 0 , AI == 1
    mode : 0,   //cold = 0 ,warm = 1,  dehumidify = 2, wind = 3

    warm : {
        speed : 1,
        temp : 30
    },
    wind : {
        speed : 1
    },
    cold : {
        speed : 1,
        temp : 16
    },
    humid : 0,
    control : {
        power : 'power',
        poweroff : 'poweroff'
    }
}

module.exports = airconditioner;