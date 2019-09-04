# 숨좀쉬자(PleaseBreath) - Raspberry Pi
> 공기 청정 기기를 제어하여 실내 환경을 쾌적하게 만드는 AI　공기 관리 솔루션

![pb](./image/pb.png)

## 실행 방법
```sh
cd /Project/H/TEST
node IN && node OUT && node Trans && node ROSE
```

## 개발 내용
1.  아두이노가 블루투스로 전송한 센서값을 읽는다. 
2.  외부와 내부의 센서값을 구분하여 웹서버로 전송한다.
3.  모드에 맞게 해당 기기의 블루투스에 IR값을 전송한다.

## 역할 분담
* 초기 서버 구성 : 민필규
* 각 기능 개발 : 민필규, 안유진, 조현학
* DB 연동 : 민필규, 안유진

## 업데이트
* 0.0.1 
    * 외부, 내부 센서값을 따로 받는 코드. 코드를 각자 돌리기 속도가 느린 상태.
* 0.0.2
    * 채널을 찾지 않고 고정적으로 주면서 IN, OUT, IR_PI_TO_AR의 블루투스 값 전송.   

## 개발자

조현학 - zhh102000@gmail.com

[https://git.swmgit.org/zhh1020](https://git.swmgit.org/zhh1020/)

안유진 - ujahnn@gmail.com

[https://github.com/ahnyujin](https://github.com/ahnyujin/)

민필규 – pilgyu147@gmail.com

[https://github.com/pilgyumin](https://github.com/pilgyumin/)

