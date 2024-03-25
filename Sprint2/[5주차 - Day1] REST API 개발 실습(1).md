### 로그인 로직(+ 고도화)

```jsx
/* user-demo.js */
app.post("/login", (req, res) => {
  // userId가 디비에 저장된 회원인지 확인
  // pwd도 맞는지 비교
  const { userId, password } = req.body;
  let loginUser;

  db.forEach((value) => {
    // db를 forEach로 순회하며 아이디가 같는지 확인
    if (value.userId === userId) {
      loginUser = value; // 아이다가 같다면 value 객체를 loginUser 대입
    }
  });
  if (isExisted(loginUser)) {
    console.log("같은거 찾았다");
    if (loginUser.password === password) {
      // 비밀번호도 같은 경우
      console.log("패스워드도 같다");
    } else {
      console.log("패스워드는 틀렸다"); // 비밀번호가 틀린 경우
    }
  } else {
    console.log("틀렸다!"); // 객체가 비어있는 경우(undefined) => 로그인이 틀린경우
  }
});

function isExisted(obj) {
  // 객체 내부 데이터가 존재하는지 체크 하는 함수
  if (Object.keys(obj).length === 0) {
    return false;
  } else {
    return true;
  }
}
```

### 자바스크립트 빈 객체를 확인하는 방법

빈 객체를 확인하는 방법

1. Object.keys()

   ```jsx
   function isEmptyObj(obj) {
     if (obj.constructor === Objec && Object.keys(obj).length === 0) {
       return true;
     }

     return false;
   }

   const obj1 = {};
   const obj2 = { name: "js" };
   const str = "Javascript";

   document.writeln(isEmptyObj(obj1)); // true
   document.writeln(isEmptyObj(obj2)); // false
   document.writeln(isEmptyObj(str)); // false
   ```

   - obj.constructor ≠= Object : 데이터 객체 타입 체크위해 constructor 체크
   - object.keys() : 파라미터로 입력받은 객체의 key 목록을 배열로 리턴 만약 배열 길이가 0이라면 비어있는 객체 확인

2. for in

   ```jsx
   function isEmptyObj(obj) {
     // 객체 타입체크
     if (obj.constructor !== Object) {
       return false;
     }

     // property 체크
     for (let prop in obj) {
       if (obj.hasOwnProperty(prop)) {
         return false;
       }
     }

     return true;
   }
   ```

   - obj.constructor ≠= Object : 데이터 타입 체크
   - for(let prop in obj) : 객체의 모든 속성을 순회
   - obj.hasOwnPorpoerty() : 프로퍼티를 소유하는지 확인

3. lodash : isEmpty

   ```jsx
   function isEmptyObj(obj) {
     if (obj.constructor === Object && _.isEmpty(obj)) {
       return true;
     }
     return false;
   }
   ```

   - loadash 라이브러리의 .isEmpty()는 object, collection, map, set이 비어있는지 체크

### 채널 API 설계

- 채널 생성 : POST/channel
  - req : body (channelTitle)
  - res 201 : `${channelTiotle}님 채널을 응원합니다!` -> 다른 페이지를 띄어주고싶은 경우 채널 관리 페이지
- 채널 개별 수정 : PUT /channel/:id
  - req : URL (id), body (channelTitle)
  - res 200 : `채널명이 성공적으로 수정되었습니다. 기존 ${} -> 수정${}`
- 채널 개별 삭제 : DELETE /channel/:id
  - req : URL (id)
  - res 200 : `삭제 되었습니다` → 메인 페이지
- 채널 전체 조회 : GET /channels
  - req : X
  - res 200 : 채널 전체 데이터 list, json Array
- 채널 개별 조회 : GET /channels/:id
  - req : URL (id)
  - res 200 : 채널 개별 데이터

```jsx
const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);
const db = new Map();
let idx = 1;

app
  .route("/channels")
  .get((req, res) => {
    // 전체 조회
    if (db.size) {
      var channels = [];
      db.forEach((value, key) => {
        channels.push(value);
      });
      res.json(channels); // JSON Array
    } else {
      res.status(404).json({
        message: `조회할 채널이 없습니다`,
      });
    }
  })
  .post((req, res) => {
    // 생성;
    db.set(idx++, req.body);
    res.status(201).json({
      message: `${db.get(idx - 1).channelTitle}채널을 응원합니다!`,
    });
  });

app
  .route("/channels/:id")
  .get((req, res) => {
    // 개별 조회
    let { id } = req.params;
    id = parseInt(id);
    if (db.get(id)) {
      res.status(200).json(db.get(id));
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  })
  .put((req, res) => {
    // 개별 수정
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
  })
  .delete((req, res) => {
    // 개별 삭제;
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
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  });
```
