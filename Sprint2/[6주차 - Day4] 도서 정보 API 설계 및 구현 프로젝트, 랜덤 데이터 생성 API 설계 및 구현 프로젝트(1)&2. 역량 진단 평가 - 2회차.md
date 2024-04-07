### cookie parser

- request에 있는 cookie를 꺼내서 사용할 수 있도록 도와준다

> **res.cookie("token", token);**

- 해당 함수를 실행하면 인자로 들어간 token에 있는 내용이 cookie 값으로 response 되어진다
  - Cookie ⇒ Name : “token”, Value : token(인자로 들어간 token)
- 403 상태코드
  - Forbidden 클라이언트 오류로, 응답 코드는 **서버에 요청이 전달되었지만, 권한 때문에 거절되었다는 것을 의미함**

### cookie 설정 변경

- HTTP : http://localhost:1234/login
- HTTPS : https://www.naver.com
  - HTTP에서 데이터 암호화가 추가된 프로토콜

```jsx
res.cookie("token", token, httpOnly: true)
```

⇒ httpOnly : **XSS 공격** ( 프론트엔드 단에서 일어나는 공격, 웹 브라저로 JS 접근함으로 버그를 일으킨다)을 **방지하기 위해서 오직 API로만 접근이 가능하도록 제약을 거는 것,**

### JWT로 인증/인가 하는 절차

```jsx
const token = jwt.sign(
  {
    email: loginUser.email,
    name: loginUser.name,
  },
  process.env.PRIVATE_KEY,
  {
    expiresIn: "5m", // 5m = 5분, 1h = 1시간
    issuer: "changwooLee",
  }
);
```

- jwt로 토큰을 발행할 떄 expiresIn으로 토큰 유지 시간을 설정할 수 있다
  - 5m = 5분, 1h = 1시간과 같이 설정된다
- issuer로 토큰 발행자도 구분해 설정할 수 있다

```jsx
{
 "email": loginUser.email,
 "name": loginUser.name,
 "iat" : 1702111452,// 발급 일
 "exp" : 1702113252,// 만료 시간(추가)
 "iss" : "changwooLee" // 발행자 (추가)
}
```

- 해당 토큰의 복호화 하여 payload를 보면 만료 시간과 발행자가 추가 되어 있는 것을 확인할 수 있다
