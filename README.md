# 숨좀쉬자(PleaseBreath) - Raspberry Pi
> 공기 청정 기기를 제어하여 실내 환경을 쾌적하게 만드는 AI 공기 관리 솔루션

![pb](./image/pb.png)

## 실행 방법
```sh
cd /Project/H/TEST
node IN && node OUT && node Trans && node ROSE
```
## 확인
1.  포트가 이미 열려 있는 경우 lsof -i 를 입력하고 열린 포트의 PID를 확인한다.
2.  kill -9 PID를 입력해 포트를 닫고 다시 서버를 연다.
3.  파이의 전원을 공급하면 서버가 자동으로 열린다. 쉘을 들어오면 서버를 여는 코드가 한번 더 입력되는데 ctrl-z로 명령을 취소하면 된다.

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
* 0.1.0
    * 공기청정기 제어 알고리즘 개발
* 0.2.0
    * 가습기 제어 알고리즘 개발
* 0.3.0
    * 웹 UI의 버튼 이벤트를 통한 기기 제어 기능 개발

## 개발자

조현학 - zhh102000@gmail.com

[https://git.swmgit.org/zhh1020](https://git.swmgit.org/zhh1020/)

안유진 - ujahnn@gmail.com

[https://github.com/ahnyujin](https://github.com/ahnyujin/)

민필규 – pilgyu147@gmail.com

[https://github.com/pilgyumin](https://github.com/pilgyumin/)

