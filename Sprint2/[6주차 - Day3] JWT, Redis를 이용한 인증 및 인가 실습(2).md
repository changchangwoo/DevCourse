### next()

```jsx
const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  } else {
    return next(); // 다음 할 일 (미들 웨어, 넥스트)
  }
};

..  .get(
    [
      body("userId").notEmpty().isInt().withMessage("userId는 숫자여야한다"),
      validate,
    ],
```

- 사용자 정의 미들웨어에서 동작을 하고, 이후 동작을 지정하기 위해서 next 함수를 작성해야한다
- next()를 호출하지 않는다면 해당 미들웨어가 finalware가 된다!
- next는 api 요청 로직에서 req, res, next와 같은 반환값으로서 받게된다

### 로그인 세션-인증과 인가

- 인증 (= 로그인 ) Authentication
  - 어떤 개체의 신원을 확인 하는 과정 ( 유저가 누구인지 확인 하는 과정, 로그인) ⇒ 관리자든 고객이든 인증을 통해서 사이트에 가입된 사용자라는 걸 증명하는것
- 인가 Authorization
  - 어떤 개체가 특정 리소스에 접근할 수 있는지 또는 어떤 동작을 수행할 수 있는지를 검증하는 것 ⇒ 인증이 된 후에, 해당 유저가 페이지에 접근 권한이 있는지 확인 하는 것

### 쿠키와 세션

- 쿠키
  - 웹에서 서버와 클라이언트가 주고 받는 데이터 중 하나
  - 서버에서 사용자의 컴퓨터에 저장하는 작은 정보 파일
    1. 로그인 ⇒ 서버가 쿠키를 구워준다
    2. 사용자 <> 서버, 쿠키를 핑퐁
  - 장점 : 서버가 저장을 하지 않는다 ⇒ Stateless(=Restful)
  - 단점 : 보안에 취약
- 세션
  - 쿠키의 보안문제를 해결
  - 중요 정보를 Cookie에 담지 않고 서버에 저장하며, 그 정보의 주소만 Cookie로 전달
  - 서버가 가진 Session에 중요 정보를 기입하고 클라이언트에게 Session ID를 쿠키로서 처리
    1. 로그인 ⇒ 서버가 금고를 만들어서 정보를 저장, 금고 번호를 준다
    2. 사용자 <> 서버가 해당 번호를 통해서 대화
  - 장점 : 비교적 향상된 보안
  - 단점 : 서버가 저장 ⇒ Stateless 하지 않는다 (≠Restful)

### JWT 개념, 특징

- Json Web Token: JSON 형태의 데이터를 안전하게 전송하기 위해 WEB에서 사용하는 TOKEN
  - 토큰은 인증의 용도, 인가의 용도 모두 사용 (입장 가능한 사용자/관리자 권한 & 일반 사용자 권한 부여)
- 장점 : 보안에 강하다, 암호화가 되어있다
- HTTP 특징을 잘 따라 Statleless 하다
- 토큰을 발행하는 서버를 따로 만들어 줄 수 있다!

### JWT 구조

- JWT는 크게 세 가지 구조로 구분되어진다

1. Hedaer

   ```jsx
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

   - 헤더에서는 해시 알고리즘과 토큰 타입을 정의할 수 있다

2. PAYLOAD

   ```jsx
   {
     "sub": "1234567890",
     "name": "John Doe",
     "iat": 1516239022
   }
   ```

   - 페이로드에는 사용자 정보값이 JSON 형태로 담겨져 있다
   - jWT 발급/만료일을 명시할 수 있다

3. VERIFY SIGNATURE

   ```jsx
   HMACSHA256(
     base64UrlEncode(header) + "." + base64UrlEncode(payload),
     your - 256 - bit - secret
   );
   ```

   - 헤더, 페이로드가 변조되어 있는지 확인할 수 있다
     - 만약 페이로드 값이 변경되면 이 서명값이 전부 바뀌어지기 때문에 JWT를 신뢰하고 사용할 수 있다

### JWT 인증-인가 절차

1. 클라이언트 로그인(API, POST /login) 요청
2. 서버 내부 로직 확인
3. 서버 JWT 토큰 발행(로그인 시점=JWT 발행 시점)
4. 서버에서 클라이언트로 JWT 토큰 제공
   1. 서버에서 SIGNATRUE 값을 통해 식별한 후 인증-인가
5. 이후 클라이언트에서 다른 API 요청시 받은 JWT 토큰을 header에 담아 요청 (=인증된 유저임을 식별하기위해)
6. 서버에서 JWT 토큰을 확인후 클라이언트에게 응답

### JWT 구현

```jsx
var jwt = require("jsonwebtoken");
var token = jwt.sign({ changwoo: "lee", hojin: "kkk" }, "kikiki");
// 서명 = 토큰 발행
// token 생성 = jwt 서명을 했다! ( 페이로드, 나만의 암호키 ) + SHA256
// token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFuZ3dvbyI6ImxlZSIsImhvamluIjoia2trIiwiaWF0IjoxNzEyMTE1MTEwfQ.dORjpteikvyzEROheeBlUQdyMGLghsqpAE4u5IA1Teg
var decoded = jwt.verify(token, "kikiki");
console.log(decoded);
// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인 할 수 있따
```

- jwt 모듈의 sign 메소드 내 객체로 JSON 값과, 식별할 수 있는 암호(privateKey) 를 인자로 넣을 수 있다
- 해당 토큰은 “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFuZ3dvbyI6ImxlZSIsImhvamluIjoia2trIiwiaWF0IjoxNzEyMTE1MTEwfQ.dORjpteikvyzEROheeBlUQdyMGLghsqpAE4u5IA1Teg” 다음과 같이 암호화되어 출력이 될 수 있는데 이를 복호화 하는 경우에 값을 추출할 수 있다
- jwt 모듈의 verify 메소드로 토큰과 그 암호에 접근 해 검증 과정을 하며, 검증이 성공하면 페이로드 값을 확인할 수 있다

### .env

- JWT 구현을 하기 위해서는 코드 내 privateKey를 설정해야한다. 하지만 이 경우에는 소스코드가 유출되는 경우 확인할 수 있어 보안에 매우매우 취약하다. git을 통해 협업을 하는 경우 더욱 그렇다. 이 경우 .env (environment) 환경 변수 설정 값 파일을 활용할 수 있다
- 포트 넘버, 데이터 베이스 계정, 암호 키 등 외부에 유출 되면 안 되는 중요한 환경 변수
- 파일 확장자가 env 이다

> npm install dotenv를 통해 외부라이브러리로서 설치할 수 있다

- 최상위 폴더에 .env 파일을 생성하여 값을 넣는다
- 다음과 같은 형태로 환경 변수를 설정하고, 주석은 ‘#’ 을 사용한다

```jsx
PRIVATE_KEY = 'secret' # JWT 암호 키
```

```jsx
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config(); // 환경변수 값을 불러오기 위해서는 config를 사용해야한다

var token = jwt.sign(
  { changwoo: "lee", hojin: "kkk" },
  process.env.PRIVATE_KEY // process.env로 접근 후 설정한 환경 변수 값을 불러온다
);
// 서명 = 토큰 발행
// token 생성 = jwt 서명을 했다! ( 페이로드, 나만의 암호키 ) + SHA256

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인 할 수 있따
```

> 이슈, dotenv의 있는 값을 읽어올 때 undefined 오류 발생
>
> 해결은 했는데 어떻게 했는지 모르겠음, 최상위에 다른 node_modules 디렉토리가 하나 더 있는 기이한 디렉토리 구조였는데 아마도 이게 문제였지 않나

- 환경변수 값을 불러오기 위해서는 config를 사용해야한다
- process.env로 접근 후 설정한 환경 변수 값을 불러온다

### JWT / env 활용

```jsx
/* youtube-demo/users.js */
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    validate,
  ],
  (req, res) => {
    // userId가 디비에 저장된 회원인지 확인
    // pwd도 맞는지 비교
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, results, fields) => {
      var loginUser = results[0];
      if (loginUser && loginUser.password === password) {
        // token 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY
        );
        res.status(200).json({
          message: `${loginUser.name}님 로그인 되셨습니다`,
          token: token,
        });
      } else {
        res.status(404).json({
          message: "이메일 또는 비밀번호가 틀렸습니다......ㅠㅠ",
        });
      }
    });
  }
);
```

- 로그인이 성공하면 해당 받은 값을 JWT sign 메소드를 통해 토큰화를 진행한다. 해당하는 암호키는 환경 변수의 PRIVATE_KEY 환경 변수를 사용한다
- 생성된 토큰을 res에 담아 클라이언트로 전달한다
