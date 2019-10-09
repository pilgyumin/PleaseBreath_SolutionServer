const aircleaner = {
    power : 0,
    speed : 1,
    control : {
        power : '0x48B7C837',
        speed_up : '0x48B78877',
        speed_down : '0x48B708F7'
    },
    //민필규 - mode가 0일 때는 실내 공기 흡입모드, mode가 1일 때는 실외 공기 흡입모드 defalut = 0;
    mode : 0
}

module.exports = aircleaner;
