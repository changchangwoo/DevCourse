### workBench 시작

- workbench의 gui 환경에서 새로운 서버를 생성

> RuntimeError : mysql runtimeerror unable to execute command chcp

그 과정에서 다음과 같은 런타임 이슈 발생 ⇒ 해당 에러는 최신 버전에서 발생하며 시스템 언어의 충돌을 원인 ( 시스템 언어를 영어로 바꿔야한다 )

최신 버전이 아닌 이전 버전으로 다운 그레이드를 함으로 문제 해결

### 테이블 생성

- 좌측단에 SCHEMAS에서 CREATE TABLE 구문을 사용하지 않고도 GUI로 테이블들을 관리하고 쉽게 생성할 수 있음.
- 테이블 내 컬럼을 생성하면서 컬럼에 해당하는 속성(pk, nn, uq등)을 설정할 수 있음
- 하단 foreign Key 단락을 통해서 외래키와 참조하는 테이블을 설정할 수 있음
- 컬럼을 생성할 때 값을 Datatype값을 TIMESTAMP, Defaul 옵션을 CURRENT_TIMESTAMP() 또는 NOW()를 주게 된다면 데이터가 생성되어질 때마다 현재 값이 출력이된다

### 데이터 삽입

- 특정한 컬럼이 Auto-Increment 상태이면 id 값이 null이더라도 자동으로 순차적인 값이 (1,2,3,4,5) 들어감
  - 이때! 사용자가 임의로 auto-increment 컬럼에 값을 넣게된다면 임의의 값 이후에 값이 auto-increment로 들어가게 됨 (1, 2, [사용자 임의 4], 5). 그러면 결국 3의 값이 비게 되어지고 데이터를 관리하기 어려워짐. ⇒ 따라서 AI의 경우 값을 입력하지 않고 DB 자체에서 index 값을 관리하도록 하는 것이 좋음
- FK를 설정할 때 참조하는 테이블에 해당 FK와 연결된 값이 없는 경우 오류가 생기게 됨

### Node.js DB연동 (mysql)

- npm을 통해 db 라이브러리 설치
  > npm install --save mysql2

```jsx
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Youtube",
});

connection.query("SELECT * FROM `users`", (err, results, fields) => {
  console.log(results), console.log(fields); /
});

/*
[ // results
  {
    id: 1,
    email: 'changwoo@naver.com',
    name: 'leechangwoo',
    password: '1111',
    contact: '010-1236-5678'
  },
  {
    id: 2,
    email: 'park@naver.com',
    name: 'parkjisung',
    password: '2222',
    contact: '010-5555-5555'
  },
  {
    id: 4,
    email: 'son@maii.com',
    name: 'sonheungmin',
    password: '3333',
    contact: '010-4444-4444'
  },
  {
    id: 5,
    email: 'lee@naver.com',
    name: 'leekangin',
    password: '5555',
    contact: '010-3333-3333'
  }
]
[ // fields
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(100),
  `name` VARCHAR(45),
  `password` VARCHAR(20),
  `contact` VARCHAR(100)
]
*/
```

- query함수는 매개변수로 쿼리문과 콜백 함수로 구성되어 있다
- 콜백 함수의 매개 변수 results는 현재 연동된 데이터베이스의 쿼리문을 출력한 결과를 담는 객체 배열을 반환한다(JSON)
- 콜백 함수의 매개 변수 fields는 현재 데이터 베이스 테이블의 정보를 담고 있다

### timezone 설정

> SELECT @@global.time_zone, @@session.time_zone

- 워크벤치에서 해당 쿼리문을 통해서 현재 타임존을 확인 할 수 있다

```jsx
SET time_zone = 'Asia/Seoul'
```

- SET 쿼리문을 통해서 타임존의 설정이 가능하다

```jsx
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Youtube",
  dateStrings: true, // 2024-03-31 09:11:19
});
```

- node.js에서 connection 함수에서 매개변수 객체에 dateStrings:true를 주게 된다면 스트링 형식으로 년-월-일 시:분:초 형식으로 값을 반환한다
