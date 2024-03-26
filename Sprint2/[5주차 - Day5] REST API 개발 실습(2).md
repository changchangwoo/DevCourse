### Server와 Router의 역할

- Server : Request를 받는다
- Router : Request의 URL에 따라 route를 정해준다 ⇒ 어디로 갈지 길만 정해준다
  - 라우팅 : 경로에 대한 요청 처리 및 핸들러 함수 호출
  - 모듈화 : 로직을 작은 단위로 분리 및 모듈화
- Node.js에서의 라우팅 : Request(요청)이 날아왔을 때, 원하는 경로에 따라 적절한 방향으로 경로 안내를 해주는 것

요청하는 API가 많아질수록 코드의 구조는 복잡해지게되고 이로인해 가독성이 떨어지게된다 **Router를 활용한다면 효율적으로 파일을 관리**할 수 있다

```jsx
/* app.js */

const express = require("express");
const app = express();
app.listen(7777);

const userRouter = require("./routes/users"); // user-demo 소환
const channelRouter = require("./routes/channels"); // chanell-demo 소환
app.use("/", userRouter);
app.use("/channels", channelRouter);
```

- 전반적인 모듈 및 URL을 설정할 수 있는 app.js를 생성하고, 이를 통해 파일을 관리한다

```jsx
/* routes/channels */

const express = require("express");
const router = express.Router(); // Router 함수
router.use(express.json());
const db = new Map();
let idx = 1;
router
  .route("/")
  .get((req, res) => {}) // 전체 조회
  .post((req, res) => {}); // 생성;

router
  .route("/:id")
  .get((req, res) => {}) // 개별 조회
  .put((req, res) => {}) // 개별 수정
  .delete((req, res) => {}); // 개별 삭제;

module.exports = router; // router를 모듈화 하여 외부에서 접근이 가능
```

- 기능별로 분리된 파일을 express의 router 함수를 통해 API 요청에 대한 동작을 작성한다
- moduel.exports를 통해 app.js에서 router에 접근할 수 있도록 모듈화한다

### VSC의 rename Symbol

- 동일한 이름의 모든 변수를 한 번에 바꾸려면(Refactoring) 바꿀 변수를 드래그하고 F2키를 누르면 된다
  - 변수가 살아있는 상태에서 변경해야 인식이 된다

### 회원 개별 소유 채널 ERD

- 회원

| user_id | password | name    |
| ------- | -------- | ------- |
| testid1 | 1234     | tester1 |
| testid2 | 5678     | tester2 |

- 채널

| id  | channel_title | user_id | sub_num | video_num |
| --- | ------------- | ------- | ------- | --------- |
| 1   | 달려라창우    | testid1 |         |           |
| 2   | 뛰어라창우    | testid2 |         |           |
| 3   | 걸어라창우    | testid3 |         |           |

### 채널 API 설계 수정

- 채널 생성 : POST/channel
  - req : body (channelTitle, userId)
  - res 201 : `${channelTiotle}님 채널을 응원합니다!` -> 다른 페이지를 띄어주고싶은 경우 채널 관리 페이지
- 채널 개별 수정 : PUT /channel/:id
  - req : URL (id), body (channelTitle)
  - res 200 : `채널명이 성공적으로 수정되었습니다. 기존 ${} -> 수정${}`
- 채널 개별 삭제 : DELETE /channel/:id
  - req : URL (id)
  - res 200 : `삭제 되었습니다` → 메인 페이지
- 채널 전체 조회 : GET /channels
  - req : body (userId)
  - res 200 : 채널 전체 데이터 list, json Array
- 채널 개별 조회 : GET /channels/:id
  - req : URL (id)
  - res 200 : 채널 개별 데이터

```jsx
const express = require("express");
const router = express.Router();
router.use(express.json());
const db = new Map();
let idx = 1;

const notFoundChannel = () => {
  // 겹치는 메세지는 함수처리로 반복 최소화
  return "조회할 채널이 없습니다";
};
router
  .route("/")
  .get((req, res) => {
    if (db.size && userId) {
      let { userId } = req.body;
      let channels = [];
      db.forEach((value, key) => {
        if (value.userId === userId) channels.push(value);
      });
      if (channels.length !== 0) {
        res.status(200).json(channels); // JSON Array
      } else {
        res.status(404).json({ message: notFoundChannel() });
      }
    } else {
      res.status(404).json({
        message: notFoundChannel(),
      });
    }
  }) // 전체 조회
  .post((req, res) => {
    if (req.body.channelTitle) {
      db.set(idx++, req.body);
      res.status(201).json({
        message: `${db.get(idx - 1).channelTitle}채널을 응원합니다!`,
      });
    } else {
      res.status(404).json({
        message: `오류발생`,
      });
    }
  }); // 생성;

router
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    if (db.get(id)) {
      res.status(200).json(db.get(id));
    } else {
      res.status(404).json({
        message: notFoundChannel(),
      });
    }
  }) // 개별 조회
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    let oldTitle = channel.channelTitle;
    if (channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);
      res.json({
        message: `채널명이 정상적으로 수정되었습니다. 기존${oldTitle} => 수정 후 ${newTitle}`,
      });
    } else {
      res.status(404).json({
        message: `오류 발생`,
      });
    }
  }) // 개별 수정
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);

    if (channel) {
      db.delete(id);
      res.status(200).json({
        message: `${channelTitle}이 정상적으로 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: notFoundChannel(),
      });
    }
  }); // 개별 삭제;

module.exports = router;
```
