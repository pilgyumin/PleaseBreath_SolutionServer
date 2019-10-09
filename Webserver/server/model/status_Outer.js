const status_Outer = {
    temp_Outer : 0,
    humid_Outer : 0,
    pm10_Outer : 0,
    pm25_Outer : 0,
    voc_Outer : 0,
    co2_Outer : 0,
    getUrl() {
    return 'tempOuter='+status_Outer.temp_Outer+'&humidOuter='+status_Outer.humid_Outer+'&pm10Outer='+status_Outer.pm10_Outer+'&pm25Outer='+status_Outer.pm25_Outer
        +'&vocOuter='+status_Outer.voc_Outer+'&co2Outer='+status_Outer.co2_Outer
}
}



module.exports = status_Outer;