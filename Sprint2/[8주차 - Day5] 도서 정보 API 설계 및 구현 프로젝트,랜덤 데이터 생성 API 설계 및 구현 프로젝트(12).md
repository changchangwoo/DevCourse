### order API 수정

```jsx
const order = async (req, res) => {
  const conn = await maraidb.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "bookstore",
    dateStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let delivery_id;
  let order_id;

  // delivery 테이블 삽입
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
  let [results] = await conn.execute(sql, values);
  delivery_id = results.insertId;

  // orders 테이블 삽입
  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?,?,?,?,?`;
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  [results] = await conn.execute(sql, values);
  order_id = results.insertId;

  // orderdBook 테이블 삽입 테이블 삽입
  sql = `INSERT INTO orderdBook (order_id, book_id, quantitiy) VALUES ?;`;
  values = [];
  items.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  [results] = await conn.query(sql, [values]);
};
```

- mysql과 mysql2는 성능의 차이가 있으며 특히 promise를 통한 await-async가 가장 핵심
- conn.query와 conn.execute의 차이는 prpeared statements 지원의 차이

### MYSQL 데이터 삭제

- DELETE
  - DELETE FROM 테이블명 (WHERE 조건);
  - 조건이 없으면 모든 행이 삭제된다 (테이블은 유지)
- DROP
  - DROP TABLE 테이블명;
  - 테이블을 통째로 삭제한다
- TRUNCATE
  - TRUNCATE 테이블명;
  - 모든 행이 삭제된다 (테이블은 유지)

테이블을 지울 때, 제약 조건의 순서에 맞춰 지워야 오류가 생기지 않는다

- 순서에 맞춰 TRUNCATE 하더라도 테이블 자체에 설정된 FOREIGN_KEY 때문에 오류가 생길 수 있다.
- 이 경우 SET FOREGIN_KEY_CHECKS = 0;으로 설정하여 FOREIGN 관련 값들을 제거하고 지우면 정상 적으로 동작한다
- - FOREIGN_KEY를 지우고 난 후 다시 FOREGIN_KEY_CHJCKS=1로 재 설정해야한다
