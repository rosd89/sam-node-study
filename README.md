# sam-node-study

### 회원가입

*  id: 유저 ID - pk
*  serverSalt: 2차 Hash를 만들기 위한 salt 값
*  clientSalt: 1차 Hash를 만들기 위한 salt 값
*  hashToken: 2차 Hash
*  userName: 유저이름
*  userAge: 유저나이
*  userEmail: 유저 이메일 주소
*  createdAt: 생성일
*  updatedAt: 업데이트날짜

```
회원가입 시작
        # client --------------------------------------------------------------------------- # server

step 1: init api 호출 -- param - userId ----------------------------------------------------> middleware - id중복체크
                                                                               
                 <- http status code 400, return body: {"errorCode": -3, "data": 'userId'}-- 중복이라면
                 
                 
                                                                                             중복이 아니라면 clientSalt 생성, serverSalt생성
                                                                                             생성된 값을 유저DB에 저장
                 <- http status code 200, return body: {"salt": "salt value" --------------- client에 clientSalt 전달


step 2: 비밀번호와 clientSalt를 바탕으로 1차HASH를 생성
        create api 호출 -- param - 유저정보, 1차HASH -------------------------------------------> 1차HASH와 serverSalt를 바탕으로 2차HASH를 생성
                                                                                              2차HASH와 유저정보를 업데이트
                 <- http status code 201 ----------------------------------------------------

회원 가입 완료        
```

### 로그인

* userId: 유저 ID 
* accesToken: 인증키
* expiredTime: 만료시간

```
로그인 시작
        # client --------------------------------------------------------------------------- # server
step 1: getSalt api 호출 -- param - userId --------------------------------------------------> 
        
                 <- http status code 200, return body: {"salt": "salt value" --------------- 유저DB를 조회해서 clientSalt값 전달

step 2: 비밀번호와 clientSalt를 바탕으로 1차HASH를 생성
        로그인 api 호출 -- param - userID, 1차HASH --------------------------------------------- 1차HASH와 serverSalt를 바탕으로 2차HASH를 생성 hash 값을 비교
        
                 <- 
