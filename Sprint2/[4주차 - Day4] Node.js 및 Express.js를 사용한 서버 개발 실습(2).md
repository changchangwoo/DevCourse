### 전체 조회

- **forEach 문법**
  - forEach는 이터러블 프로토콜을 따르는 순회 객체이다
  - 콜백 함수 또는 익명 함수를 받으며 함수의 매개변수로 그 요소를 전달한다
  - 함수의 인자는 총 세 개이다 (선택 인자)
    - currentValue (필수 값) : 순회하며 현재 요소에 접근
    - index (선택 사항) : 현재 요소의 인덱스 접근
    - array (선택 사항) : 원본 배열에 접근
  ```jsx
  /* foreach-demo.js */
  const arr = [1, 2, 3];

  // 객체 (또는 배열)에서 요소를 하나 꺼낸 다음
  // 매개 변수로 그 요소를 전달하여 호출하는 콜백함수
  arr.forEach((a, b, c) => {
    // 각각 a는 데이터, b는 인덱스, c는 전체 객체를 반환
    console.log(`a : ${a}, b : ${b}, c : ${c}`);
    //  a : 1, b : 0, c : 1,2,3
    //  a : 2, b : 1, c : 1,2,3
    //  a : 3, b : 2, c : 1,2,3
  });

  // Map에서 foreach의 응용
  let map = new Map();
  map.set(7, "seven");
  map.set(8, "eight");
  map.set(9, "nine");
  map.forEach((value, key) => {
    // map의 경우에는 a는 value값, b는 key값을 반환
    console.log(`a : ${a}, b : ${b}`);
  });
  // a : seven, b : 7
  // a : eight, b : 8
  // a : nine, b : 9
  ```

```jsx
/* youtuber-demo.js*/
.
.
.
app.get("/youtubers", (req, res) => {
  var youtubers = {}; // 클린코드를 지향한다면 복수형과 단수형의 구분을 명확히하자
  db.forEach((youtuber, index) => {
    youtubers[index] = youtuber;
  });
  res.json(youtubers);
});
```

⇒ forEach를 활용해서 db Map 객체에 있는 값들을 전부 읽어와 json 형식으로 출력하는 코드 (응용)

### 자바스크립트 map

- forEach와 map의 차이
  - 두 코드 전부 값을 순회하고 각 요소에 동작하는데 사용한다
  - 하지만 forEach는 반환 값을 가지지 않으며 원래 배열의 수정이 가능하다. 반면 map은 각 요소에 동작 이후 새로운 배열을 반환한다
  ⇒ foreach는 단순 반복, map은 아이템을 처리 후 새로운 배열 생성에서 차이가 있다
  ```jsx
  /* foreach-demo.js */
  .
  .
  .
  const arr = [1, 2, 3];

  const foreachArr = arr.forEach((a, b, c) => {
    return a * 2;
  });

  const mapArr = arr.map((a, b, c) => {
    return a * 2;
  });

  console.log(`foreach로 return : ${foreachArr}, map으로 return : ${mapArr}`);
  // foreach로 return : undefined, map으로 return : 2,4,6
  ```

### 자바스크립트 HTTP method ‘delete’

- 개별 유튜버 “삭제” API 명세 ⇒ DELETE /youtubers/:id
  - req : params.id
  - res : {“message” : “${channelTitle}님 그동안 즐거웠습니다….}
  - **URL이 똑같더라도 method가 다르다면 다른 동작을 요청할 수 있다. 의도와 맞는 method!**
  ```jsx
  /* youtuber-demo.js*/
  .
  .
  .
  app.delete("/youtubers/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    if (db.get(id) === undefined) {
      res.json({ message: "삭제할 아이디를 찾을 수 없어요" });
    } else {
      let youtuber = db.get(id);
      res.json({ message: `${youtuber.channelTitle}님 그동안 즐거웠습니다…` });
      db.delete(id);
    }
  });
  ```
  - 동작이 정상적으로 수행되면 map 객체 내 요청받은 id의 key를 가진 value 사라진다

> 예외처리 및 안정적인 API 통신 설계에는 프론트-백엔드 간의 협업이 중요하다. 그렇기 때문에 API 설계 명세 문서의 작성이 매우 중요하다

- 전체 유튜버 “삭제” API 명세 ⇒ DELETE /youtubers
  - req : X
  - res : {”message” : “전체 유튜버가 삭제되었습니다….”}
  ```jsx
  /* youtuber-demo.js */
  app.delete("/youtubers", (req, res) => {
    if (db.size >= 1) {
      // .size 프로퍼티는 Map (db) 객체 내 개수를 반환한다
      db.clear(); // .clear 메소드는 Map 객체 내 값들을 전부 삭제한다
      res.json({ message: "전체 유튜버가 삭제되었습니다....." });
    } else {
      // size가 0인경우 => 값이 없는 경우
      res.json({ message: "삭제할 유튜버가 없긴 합니다" });
    }
  });
  ```
  > vsc 메소드/프로퍼티 자동 완성에서의 정육면체는 메소드, 직육면체는 프로퍼티이다

### 리팩토링

결과의 변경 없이 소프트웨어의 코드 구조를 재조정 하는 것

⇒ 버그를 없애거나 새로운 기능을 추가하는 과정은 아니다!

- 리팩토링을 해야하는 이유
  - 가독성을 높이고 유지보수성 향상 ⇒ (! 성능의 최적화는 아니다)
  - 협업을 함에 있어 빠른 이해는 곧 업무의 효율성 증가
- 리팩토링을 해야하는 시기
  - 에러가 N회 발견되었을 때
  - 리팩토링을 하는 과정에서 에러를 발견할 수 있다
  - **기능을 추가하기 전** ( EX : API URL “설계” 수정)
  - 코드 리뷰할 때

> **배포나 운영 직전에는 절대로 코드 수정이 일어나선 안된다!!**

### 자바스크립트 HTTP method ‘put’

- 개별 유튜버 “수정” API 명세 ⇒ PUT /youtubers/:id
  - req : params.id, body : channelTitle
  - res : {“message” : “(이전)${channelTitle}님 새로운(${channelTitle)로 채널명 변경되었습니다}
  ```jsx
  /* youtuber-demo.js */
  .
  .
  .
  app.put("/youtubers/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let youtuber = db.get(id);
    console.log(youtuber);
    if (youtuber !== undefined) {
      let prevChannelTitle = youtuber.channelTitle;
      let newChannelTitle = req.body.channelTitle;
      youtuber.channelTitle = newChannelTitle;
      res.json({
        message: `${prevChannelTitle}님 ${newChannelTitle}로 채널명이 변경되었습니다!`,
      });
    } else {
      res.json({
        message: `요청하신 ${id}번은 없는 번호입니다`,
      });
    }
  });

  ```
  ### HTTP 상태코드

HTTP(인터넷 상에서 통신할 때 사용하는 규약) 안에 작성되어 들어가는 “상태”

- 1XX : information response
- 2XX : Successful responses
  - 200 OK : 요청이 성공적이다 (조회/수정/삭제 성공)
  - 201 Created : 요청이 성공적이고 그로 인해 새로운 리소스 생성. 일반적으로 POST 요청 또는 일부 PUT 요청 이후에 생성
- 3XX : Redirection messages
- 4XX : Client error responses
  - 400 Bad Request: 잘못된 문법으로 서버가 요청을 이해할 수 없다
  - 401 Unauthorized : 미승인, 비인증
  - 403 Forbidden : 접근할 권리를 가지고 있지 않다 (미승인이어서 서버 거절)
  - 404 Not Found : 서버에서 요청받은 URL을 찾을 수 없다 (URL에 맞는 API없음)
- 5XX : Server error responses
  - 500 Internal Server Error : 웹 사이트 서버에 문제가 있다. (서버가 크리티컬한 오류를 맞았다)
  - 502 Bad Gateway : 인터넷 상 서버가 다른 서버로부터 유효하지 않은 응답을 받았다
