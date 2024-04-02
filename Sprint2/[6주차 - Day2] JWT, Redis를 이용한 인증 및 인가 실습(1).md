### 유효성 검사 (validation)

> **사용자가 입력한 값에 대한 타당성**

⇒ 외부 모듈 ‘express-validator” 활용

```jsx
const { body, validationResult } = require("express-validator");
.
.
// API 요청
  .post(
    [
      body("userId").notEmpty().isInt().withMessage("userId는 숫자여야한다"),
      body("name").notEmpty().isString().withMessage("name은 문자로 입력하자"),
    ],
    (req, res) => {
      // 유효성 검사
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      // 생성;
      let { name, userId } = req.body;

      let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
      let values = [name, userId];
      conn.query(sql, values, (err, results) => {
        res.status(201).json(results);
      });
    }
  );
```

- express-validator 모듈에서 {body, validatioResult} 변수를 받아온다
  - body는 유효성 검사하는 값을 body로서 받기 때문이다
  - validationResult는 유효성 검사에 대한 값을 반환한다
- API 요청 함수에 첫번째 인자로 유효성 검사의 관련한 값을 할당한다
  - 값이 두 개 이상인 경우 배열로서 값을 묶어 할당
  - notEmpty 함수로 값이 비어있는지 식별이 가능하며 isInt, isString 함수를 통해 해당 하는 값의 타입을 구분할 수 있다.
- 만약 유효하지 않다면, 오류 객체가 validationResult 값에 할당하게 되어진다. 이를 통해 validationResult가 isEmpty()로 구분하여 유효성을 식별한다 ⇒ 만약 비어있지 않다면 유효성 검사의 실패하였으니 오류 상태를 반환하고 요청을 중단한다.
  ```jsx
  const { body, param, validationResult } = require("express-validator");
  .
  .
  // API
    .get(
      **// 유효성 검사**
      param("id").notEmpty().withMessage("채널 id가 비어있으면 안됩니다"),
      (req, res) => {
        err = validationResult(req);
        if (!err.isEmpty()) {
          return res.status(400).json(err.array());
        }
        let { id } = req.params;
        id = parseInt(id);
        let sql = `SELECT * FROM channels WHERE id = ?`;
        conn.query(sql, id, (err, results) => {
          if (results.length) res.status(200).json(results);
          else notFoundChannel();
        });
      }
    )

  ```

### SQL 에러 (err)

- 유효성 검사를 활용하면 요청을 받는 값에 대한 유효성은 확인할 수 있지만 해당 하는 값을 통한 SQL 로직에 대한 에러( 외래키 제약 조건 위반으로 인한 값의 삽입 불가)등은 파악할 수 없다. ⇒ (사용자 요청 처리가 아니기 때문)

⇒ 이를 위해 따로 SQL 에러 처리를 해야한다

```jsx
.
.
      conn.query(sql, values, (err, results) => {
        // SQL 에러처리
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
```

- 만약 sql 도중 err가 생긴다면 err 확인하고 해당하는 상태의 결과를 return한다

### API 우선순위

- 만약에 요청이 겹쳐 동일한 로직을 수행하는 API 코드가 중복되는 경우, 우선순위는 먼저 작성한 코드(코드의 위치)에 따라 결정되어진다

### UPDATE 리팩토링

```jsx
  .put( // 개별수정
    [
      param("id").notEmpty().withMessage("채널 id가 비어있으면 안됩니다"),
      body("name").notEmpty().isString().withMessage("채널명 오류"),
    ],
    (req, res) => {
      err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      let { id } = req.params;
      id = parseInt(id);
      let { name } = req.body;
      let sql = `UPDATE channels SET name =? WHERE id=?`;
      let values = [name, id];
      conn.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows === 0) {
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  ) // 개별 수정
```

- body와 param 모두 사용하기 때문에 두 값 모두 유효성 검사를 진행한다
- update의 경우 실패를 하더라도 results 객체가 반환이 된다. ⇒ 성공과 실패의 구분이 없다
- 성공과 실패의 차이는 객체 내 프로퍼티 affectedRows의 값 변화와 같은 상태 변화로 따로 구분을 하는 코드를 작성해야한다

### 유효성 검사 미들웨어 분리

```jsx
const validate = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
};
```

- 중복이 되는 유효성 검사 확인 코드를 미들웨어로서 사용하기 위해 해당하는 로직을 분리한다. 이 때 모듈로서 사용하기 위해 함수의 표현식을 통해 함수를 변수로서 받는다

```jsx
  .get( // 요청 API에서
    [
      body("userId").notEmpty().isInt().withMessage("userId는 숫자여야한다"),
      validate,
    ],
    (req, res) => {
      // 전체 조회
      let { userId } = req.body;
      let sql = `SELECT * FROM channels WHERE user_id =?`;

      conn.query(sql, userId, (err, results, fields) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: notFoundChannel(),
          });
        }
      });
    }
  )
```

- API 라우트 핸들러의 첫번째 요소는 요청이 들어왔을 때 실행될 미들웨어가 들어간다. 이 미들웨어 배열은 body에 값을 받고, 그 값을 통해 실제 유효성 검사를 동작하는 역할을 수행한다
  - 미들웨어가 여러개 이더라도 배열 내부에 순차적으로 값을 넣으면 된다. ⇒ 개수 제한X
- req, res 객체는 Express.js에서 요청을 처리하는 동안 사용되며 get() 함수가 동작할 떄 미리 생성된다. 콜백함수가 동작할 때 생성되는 것이 아니다
