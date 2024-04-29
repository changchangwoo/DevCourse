### Node.js 패키지 구조

- 라우터가 로직까지 전부 수행할 때 단점
    - 프로젝트 규모가 커질수록 코드가 엄~청 복잡해진다
    - 가독성이 안좋다
    - 트러블 슈팅이 어렵다

⇒ 유지보수하기 어렵다!

> **코드를 간결하게하고 가독성이 높게 만들어줘야 한다!**
> 

### 컨트롤러

- 프로젝트에서 매니저 역할을 하는 파일
- 요청받은 동작에 따라 어떤 코드가 동작을 해야할 지 제시!
    - 직접 동작하지는 않음
    
    ⇒ router를 통해, “사용자의 요청”이 찾아오면 콜백함수에게 요청
    
- 콜백함수의 처리 결과를 컨트롤러가 다시받고 사용자에게 응답

```jsx
/* 이창우 */
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // crypto 모듈 : 암호화
require("dotenv").config();

const join = (req, res) => {
  const { email, password } = req.body;
  let sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
  const salt = crypto.randomBytes(64).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100, 10, "sha512")
    .toString("base64");
  let values = [email, hashPassword, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
    }
    res.status(StatusCodes.CREATED).json();
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 100, 10, "sha512")
      .toString("base64");
    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "songa",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log(token);
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED);
    }
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;
  let sql = `UPDATE users SET password =?, salt =? WHERE email =?`;
  const salt = crypto.randomBytes(64).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100, 10, "sha512")
    .toString("base64");

  let values = [hashPassword, salt, email];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};
module.exports = { join, login, passwordResetRequest, passwordReset };

```