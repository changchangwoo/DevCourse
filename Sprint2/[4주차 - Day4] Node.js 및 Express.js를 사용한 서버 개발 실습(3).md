### 핸들러

- 요청에 의해 호출되는 메소드 ⇒ HTTP request가 날아오면 자동으로 호출되는 메소드
  - node js에서의 콜백함수

```jsx
/* exception-demo.js */

app.delete("/youtubers/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  let youtuber = db.get(id);
  if (youtuber) {
    // 조건문에서 긍정인 경우 변수명을 바로 사용해서 확인이 가능하다
    // 반대로 부정인 경우 !변수명을 통해 확인이 가능하다
    let youtuber = db.get(id);
    res.json({
      message: `${youtuber.channelTitle}님 그동안 즐거웠습니다…`,
    });
    db.delete(id);
  } else {
    res.json({ message: "삭제할 아이디를 찾을 수 없어요" });
  }
});
```

### JSON array, find(), 예외처리

- find 함수
  ```jsx
  /* exception-demo.js */

  app.get("/fruits/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    var findFruit = fruits.find((f) => f.id === id);
    // fruits 배열 안에 있는 객체 중 id프로퍼티가 id값과 같다면 반환
    res.json(findFruit);
  });
  ```
- status 코드를 활용한 예외 처리
  ```jsx
  /* exception-demo.js */

  app.get("/fruits/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    var findFruit = fruits.find((f) => f.id === id);
    if (findFruit) res.json(findFruit);
    else res.status(404).send(`전달주신 ${id}로 저장된 과일이 없습니다`);
  });
  ```
  - res 앞에 특정한 상태코드를 추가하는 status 메소드로 입력 처리가 가능하다
    ⇒ 프론트엔드와 백엔드간의 안정적인 통신이 가능하도록 한다
    ⇒ 클라이언트(사용자 및 화면)와의 소통을 명확하게 한다

### ‘==’ vs ‘===’

== : Eqaul Operator

=== : Strict Equal Operator

두 연산자 전부 값을 비교할 떄 사용되지만 ===은 “엄격하게” 같음을 비교할때 사용한다

- == 연산자
  - 두 값을 비교해서 같으면 true, 다르면 false이지만 두 피연산자 값이 서로 타입이 다른 경우에 자동으로 일부 피연산자의 타입을 변환한 후 값 비교
  ```jsx
  100 == 100; // true
  100 == "100"; // true
  1 == true; // true
  true == "true"; // true
  null == undefined; // true
  ```
- === 연산자
  - == 연산자와 달리 두 피연자 값의 타입이 서로 다르더라도 변환하지 않고 있는 그대로의 값을 비교하는 방식
  ```jsx
  100 === 100; // true
  100 === "100"; // false
  1 === true; // false
  true === "true"; // false
  null === undefined; // false
  NaN === NaN; // false
  ```
  - NaN 값은 어떠한 결과값도 일치하지 않는다 ⇒ 항상 false가 반환된다
- **불필요한 오류를 방지하기 위해 명확히 타입을 변환하고 === 을 사용하자**

### 예외처리

- req의 body 값이 입력되지 않았을 때
  ```jsx
  /* youtuber-demo.js */

  app.post("/youtubers", (req, res) => {
    const channelTitle = req.body.channelTitle;
    if (channelTitle) {
      db.set(index++, {
        channelTitle: channelTitle,
        sub: "0명",
        videoNum: "0개",
      });
      res.json({ meessage: `${channelTitle}님아 환영합니다` });
    } else {
      res.status(400).json(); // 클라이언트의 요청 데이터를 못찾았으니 400 반환
    }
  });
  ```
  - 요청한 연산을 할 때 필요한 데이터(request)가 오지 않은 상황이니 400 상태코드 반환
- db(Map 객체)에 값이 비워져있을 때
  ```jsx
  /* youtuber-demo.js */

  app.get("/youtubers", (req, res) => {
    var youtubers = {}; // 클린코드를 지향한다면 복수형과 단수형의 구분을 명확히하자
    if (db.size !== 0) {
      // map 객체는 비어 있는 경우를 undefined로 받지 않는다
      db.forEach((value, key) => {
        youtubers[key] = value;
      });
      res.json(youtubers);
    } else {
      res.status(404).json({
        message: "오류 발생",
      });
    }
  });
  ```
  - map 객체는 비어져 있는 경우를 undefined로 받지 않아 size를 통해 예외처리 동작 구현

## 미니 프로젝트

### 회원 API 설계

- 로그인 : POST /login
  - req : body (id, pwd)
  - res : `${name}님 환영합니다` ⇒ 메인 페이지
- 회원 가입 : POST /join
  - req : body (id, pwd, name)
  - res : `${name}님 환영합니다` ⇒ 로그인 페이지
- 회원 개별 정보 “조회” : GET /user/:id
  - req : URL (id)
  - res : id, name
- 회원 탈퇴 : DELETE /user/:id
  - req : URL (id)
  - res : `${name}님 다음에 또 뵙겠습니다.` ⇒ 메인 페이지

```jsx
/* user-demo.js */
const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);
const db = new Map();
let idx = 1;
// 로그인

// 회원가입
app.post("/join", (req, res) => {
  if (req.body == !{}) {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`,
    });
  } else {
    db.set(idx++, req.body);
    console.log(db);
    res.status(201).json({
      message: `${db.get(idx - 1).name}님 회원가입을 축하합니다`,
    });
  }
});

// 회원 개별 조회 및 삭제
// route 메소드 사용
app
  .route("/users/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);
    if (user === undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다",
      });
    } else {
      res.json({
        userId: user.userId,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);
    if (user === undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다",
      });
    } else {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 다음에 또 뵙겠습니다`,
      });
    }
  });
```
