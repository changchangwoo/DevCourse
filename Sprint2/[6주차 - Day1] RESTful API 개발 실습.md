### 회원 개별 조회 db 연동

- 회원 개별 조회 : GET /users
    - req : body (email)
    - res : 회원 객체 전달

```jsx
router
  .route("/users/:id")
  .get((req, res) => {
    let { email } = req.body;
    conn.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, results, fields) => {
        if (results.length === 0) {
          res.status(404).json({
            message: "회원 정보가 없습니다",
          });
        } else {
          res.json({ results });
        }
      }
    );
  })
```

- 기존 map 객체를 통해 임시 db를 사용하던 회원 개별 조회 코드의 수정
- 모듈화를 통해 받아온 conn 객체에 쿼리문을 동작함으로 수행한다
    
    > code: 'ER_PARSE_ERROR',
    errno: 1064,
    sqlState: '42000',
    sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the
    right syntax to use near '@naver.com' at line 1",
    sql: 'SELECT * FROM users WHERE email = [changwoo@naver.com](mailto:changwoo@naver.com)'
    > 
    - 해당 동작 과정에서 에러 발생 ( syntax 오류 )
    - 템플릿 리터럴로 받는 변수 값은 틸드로 묶어있더라도 따로 문자열 처리(따옴표)를 해야한다
    - 또는  `SELECT * FROM users WHERE email = ?`, email과 같이 해야한다

### 회원 가입 INSERT, db 연동

- 회원 가입 : POST / join
    - req : email, name, password, contact
    - res : X

```jsx
router.post("/join", (req, res) => {
  if (req.body == !{}) {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`,
    });
  } else {
    const { email, name, password, contact } = req.body;
    conn.query(
      `INSERT INTO users (email, name, password, contact)
    VALUES (?,?,?,?)`,
      [email, name, password, contact],
      (err, results, fields) => {
        res.status(201).json(results);
      }
    );
  }
});
```

- map 객체에 set을 넣던 로직의 회원가입 코드의 수정
- req.body로 값을 받게 되는 경우 쿼리문에 각각 value로 값을 넣어 동작
- (?,?,?,?) 문법의 여러 value가 들어가는 경우 배열을 활용
- INSERT는 성공했을 시 results에 따로 객체값 반환이 없음

### 회원 탈퇴 DELETE ,db 연동

- 회원 개별 탈퇴 : DELETE /users
    - req : body (email)
    - res : ${name}님 다음에 또 뵙겠습니다

```jsx
  .delete((req, res) => {
    let { email } = req.body;
    console.log(email);
    conn.query(
      `DELETE FROM users WHERE email = ?`,
      email,
      (err, results, fields) => {
        if (results) {
          res.status(200).json({
            message: `${email}님 그동안 감사했습니다!`,
          });
        } else {
          res.status(404).json({
            message: `삭제 할 이메일을 찾을 수 없습니다`,
          });
        }
      }
    );
  });
```

- delete는 실패해도 results값을 반환한다 ⇒ 성공적인 delete여부를 확인하기 위해서는 더 자세한 식별 여부로의 로직 변경이 필요하다

### 로그인 SELECT, db 연동

```jsx
router.post("/login", (req, res) => {
  // userId가 디비에 저장된 회원인지 확인
  // pwd도 맞는지 비교
  const { email, password } = req.body;
  conn.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    (err, results, fields) => {
      var loginUser = results[0];
      if (loginUser && loginUser.password === password) {
        res.status(200).json({
          message: `${loginUser.name}님 로그인 되셨습니다`,
        });
      } else if (loginUser && loginUser.password !== password) {
        res.status(400).json({
          message: `비밀번호가 틀렸습니다`,
        });
      } else {
        res.status(404).json({
          message: "회원 정보가 없습니다",
        });
      }
    }
  );
});
```

- SELECT 쿼리문을 통해 아이디(email)이 우선적으로 있는지 확인
- 값이 있다면(loginUser = true) 비밀번호를 확인
- 비밀번호도 맞으면 로그인 동작

INSERT할 때 userid값이 이상해서 실패하더라도 201 상태메세지를 반환한다. ⇒ DB에 접근을 할 때 입력받은 값이 정상적인지, 유효한지에 대한 유효성 검사가 필요