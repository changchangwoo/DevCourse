### JWT API 테스트

```jsx
/* authorization-demo.js */

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.listen(1234);

// GET + "/jwt" : 토큰 발행
app.get("/", function (req, res) {
  const token = jwt.sign({ changwoo: "lee", hojin: "kkk" }, "secret");
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  res.status(200).send("토큰발행 완료");
});
```

- “/” 엔드포인트로 get 요청이 들어오면 토큰을 발행하고, 해당하는 토큰을 res.cookie를 통해 쿠키값으로 설정한다
  ```jsx
  Response Headers
  X-Powered-By: Express
  **Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFuZ3dvbyI6ImxlZSIsImhvamluIjoia2trIiwiaWF0IjoxNzEzNzg2NDQyfQ.RxpX7L9UPFBe3KZcJg0bGJ6WAc5VVwli__7eQl00CDk; Path=/; HttpOnly**
  Content-Type: text/html; charset=utf-8
  Content-Length: 19
  ETag: W/"13-tl1U01sRTXQYGUXoHLzGmUJip2s"
  Date: Mon, 22 Apr 2024 11:47:22 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5
  ```
  - 정상적으로 쿠키가 설정되었다면 response Header에 자동으로 set-cookie가 되어진다
  ```jsx
  /* authorization-demo.js */

  app.get("/jwt/decoded", function (req, res) {
    let receviedJWT = req.headers["authorization"];
    console.log(receviedJWT);
    var decoded = jwt.verify(receviedJWT, "secret");
    res.send(decoded);
  });
  ```
  - 해당하는 암호화된 JWT 토큰을 쿠키로 받고, 받은 쿠키를 headers의 Authroization 값으로 넣어 요청을 하게 된다면, 서버에서 요청받은 header 값을 복호화하여 토큰을 식별한다

### 기존 API에 JWT 구현

```jsx
const addLike = (req, res) => {
  let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
  const { id } = req.params;
  let receivedJWT = req.headers["authorization"];
  console.log("received jwt : ", receivedJWT);
  let decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
  console.log(decodedJWT);

  let values = [decodedJWT.id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 로그인을 통해 아이디와 이메일을 암호화한 토큰을 쿠키로 전송
- headers로 쿠키에 담겨져있는 token값을 받고 복호화를 실시, 이후 해당하는 토큰에서 아이디를 추출하고 동작 수행
  ```jsx
  function ensureAuthorization(req) {
    let receivedJWT = req.headers["authorization"];
    let decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
    return decodedJWT;
  }
  ```
  - 해당하는 로직은 반복되어지기때문에 모듈화를 통해 가독성을 향상시킬 수 있다

### JWT 예외 처리

- 유효기간이 지난경우, 500 에러만 내지말고 예외처리를 통해 사용자 경험 고려
  - ‘ 로그인 (인증) 세션이 만료되었다. ‘

1. TokenExpiredError : 유효기간이 지난 토큰 = 만료된 토큰
2. JsonWebTokenError : 문제가 있는 토큰

### try…catch 문법

- 개발자가 예상하지 못한 에러(실수, 사용자 입력 오류, 디비 응답 오류)등을 처리하는 문법

```jsx
try {
  // 코드 실행
} catch (err) {
  // 에러 처리
}
```

- try 구문의 코드를 실행하다가 에러가 발생하면 try코드를 멈추고 catech로 err와 함께 바로 나간다
- try 구문에서 어떤 에러가 발생해도 f 문 분기 처리를 해주던 내용이 알아서 catch에 잡힌다 (syntax error 등)

### 에러 객체

- 자바스크립트에서 예외를 나타내며, 이름, 메시지, 스택 추적 정보 등을 포함.
- 주로 try-catch 문을 통해 예외 처리
- SyntaxError, ReferenceError, TypeError 등

### Throw

- 에러를 발생시키는 연산자
- js 자체에서는 오류로 인식되어지진 않지만, 개발자 입장에서 예외처리를 해야하는 경우 throw를 통해 에러를 설정할 수 있음
- try-catch문에서 주로 사용되며 이를 통해 코드의 안전성 향상 가능

### TokenExpiredError

```jsx
function ensureAuthorization(req, res) {
  try {
    let receivedJWT = req.headers["authorization"];
    let decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
    return decodedJWT;
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었다",
    });
  }
}
```

- 토큰이 만료되는 경우, catch를 통해 error가 인식되어지고 사용자에게 로그인 세션 만료를 알림

### instanceOf

```jsx
  if (authorization instanceof jwt.TokenExpiredError)
```

- instanceOf 연산자는 자바스크립트에서 객체의 유형을 확인하는데 사용
- 특정 객체가 특정 클래스의 인스턴스인 경우 ture반환 그렇지 않은 경우 false반환, 이를 통해 객체의 유형 검사 가능
- authorization이 jwt.tokenExpiredError와 동일한 에러인경우 해당하는 예외처리
