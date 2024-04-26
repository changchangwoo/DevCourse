### Node.js 비동기

```jsx
let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;

conn.query(sql, values, (err, results) => {
  if (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  delivery_id = results.insertId;
});

sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?,?,?,?,?`;
values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
```

- 이슈 : conn.query 통신 함수 내부에서 delivery_id에 값을 할당하는 것 보다 아래에서 values로 **delivery_id 값을 호출하는것이 더 우선적으로 일어난다**
  - Node.js 특징 “논 블로킹 I/O” ⇒ 요리를 순차적으로 X, 중간중간 비는 시간이 있으면 다른 요리를 한다

### Node.js 비동기 처리 방식

- 비동기 발생
  - 실행되는 코드가 기다려야 하는 시간이 생긴다는 의미 ⇒ 이전 시간이 오래 걸리면 다음 코드를 실행
  - setTimeOut(), setInterval(), **query()**
- 비동기 처리
  - 비동기가 필요 없을 때가 있다 ⇒ 이전 코드의 시간을 기다리고 순서를 맞춰 코드를 실행
  1. 콜백 함수 : 할 일 다 하고, 이거 실행해줘 (= 순서 맞춰서 이걸 뒤에 실행 요청)
  2. promise (resolve, reject)
  3. then & catch
  4. **ES2017 promise ⇒ async & await**

### promise 객체

- Promise 이전에 비동기 작업의 결과에 따른 작업 수행은 콜백함수를 사용하였음
- 콜백 함수의 지나친 사용(콜백 지옥)을 개선하기 위해 등장
- Promise : 비동기 작업의 완료 또는 실패를 나타내는 객체

```jsx
// Promise "객체" : 약속을 지키는 친구

let promise = new Promise(function (resolve, reject) {
  // executor : 이 친구가 할 일
  setTimeout(() => {
    resolve("완료");
  }, 3000);
  // 할 일을 성공하면 reslove 결과
  // 실패하면 reject
}); // 친구 소환,
// 매개 변수로 함수를 받는다

// promise의 기본 메소드 : promise가 일 다하고 (= 약속 다 지키고) 호출해야하는 함수
promise.then(
  function (result) {
    console.log(result);
  },
  function (err) {}
);
```

- 동작이 성공되었으면 resolve, 실패시 reject 메소드 호출
- 이렇게 동작이 완결된 promise 객체는 .then()을 통해서 성공과 실패에 대한 후속 처리가 가능하다 ⇒ **promise chaining**

```jsx
// 프로미스 객체를 반환하는 함수 생성
function myPromise() {
  return new Promise((resolve, reject) => {
    if (/* 성공 조건 */) {
      resolve(/* 결과 값 */);
    } else {
      reject(/* 에러 값 */);
    }
  });
}

// 프로미스 객체를 반환하는 함수 사용
myPromise()
    .then((result) => {
      // 성공 시 실행할 콜백 함수
    })
    .catch((error) => {
      // 실패 시 실행할 콜백 함수
    });
```

- 일반적인 promise 객체는 다음과 같은 함수 형식으로 사용되어진다

> Promise 객체를 함수 형식으로 만드는 이유

1. 재사용성 : 반복되는 비동기 작업을 효율적 처리 가능
2. 가독성 : 코드의 구조가 명확해 비동기 작업의 사용을 분리하며 가독성 높임
3. 확장성 : 동적으로 비동기 작업 수행 가능
   >

### async

```jsx
async function f() {
  return 7; // Promise 객체 반환
  // async 함수는 무조건 Promise 객체를 반환
  // 만
}

f().then(
  function (result) {
    console.log("promise resolve : ", result);
  },
  function (error) {
    console.log("promise reject : ", error);
  }
);
```

- async 함수는 무조건 Promise 객체를 반환
- 만약 반환값이 Promise가 아니면 Promise.reslove()로 감싼다

### async-await

- promise를 더욱 간단하게 사용할 수 있도록 es7부터 지원되는 함수
- async
  - function 앞에 async를 붙이면 항상 promise 객체를 반환한다
- await
  - async 함수 안에서만 동작한다
  - awiat 키워드를 만나면 해당하는 프라미스가 처리되어질 때 까지 기다렸다 결과를 그 이후에 반환한다

### 3개의 promise 순서대로 실행

```jsx
async function f2() {
  let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("첫 번째!"), 3000);
  });
  let result1 = await promise1;

  console.log(result1);

  let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("두 번째!"), 3000);
  });

  let result2 = await promise2;
  console.log(result2);

  let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("세 번째!"), 3000);
  });

  let result3 = await promise3;
  console.log(result3);
}

f2();
```

- promise 객체를 받는 result는 각각 해당하는 promise가 반환되어질 때 까지 기다렸다 동작한다. 따라서 3초, 3초, 3초 씩 기다린 후 첫번째, 두번째, 세번째, 콘솔이 출력 된다
  query 순서대로 실행
- 일반함수엔 await을 사용할 수 없고 async에만 사용이 가능하다!
- node.js의 mysql2 모듈을 입력받을 때 ‘mysql/promise’로 모듈을 받는다면 connect에 대한 값을promise 객체로 반환해준다
  ```jsx
  /* mariadb.js */

  const connection = async () => {
    const conn = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "1234",
      database: "bookstore",
      dateStrings: true,
    });

    return conn;
  };
  ```
  - 다음과 같이 config 파일에서 await로 받아야한다
