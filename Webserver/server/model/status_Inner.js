const status_Inner = {
    temp_Inner : 0,
    humid_Inner : 0,
    pm10_Inner : 0,
    pm25_Inner : 0,
    voc_Inner : 0,
    co2_Inner : 0,
    getUrl(){
    return 'tempInner='+status_Inner.temp_Inner+'&humidInner='+status_Inner.humid_Inner+'&pm10Inner='+status_Inner.pm10_Inner+'&pm25Inner='+status_Inner.pm25_Inner
        +'&vocInner='+status_Inner.voc_Inner+'&co2Inner='+status_Inner.co2_Inner
}
}



module.exports = status_Inner;