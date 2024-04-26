### 주문하기 SQL

- 배송 정보 입력

```jsx
INSERT INTO delivery (address, reciver, contact) VALUES (?, ?, ?)
```

- 주문 정보 입력

```jsx
INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
VALUES ("어린왕자들", 3, 60000, 1, 1)

```

- 주문 상세 목록 입력

```jsx
INSERT INTO orderdBook (order_id, book_id, quantity) VALUES (1, 1, 1)
```

### insert_id

- last_insert_id
  - 가장 최근에 성공적으로 수행된 **INSERT 구문**에 대해서 (update, delete 등 에는 영향받지 않음) 자동으로 생성 되는 **AUTO_INCREMENT** 인 column 의 값을 반환
  ⇒ 주문 정보 입력의 delivery_id를 last_insert_id를 통해서 작성함으로 활용가능하다
- insert가 성공하게 되면 데이터베이스는 results 객체를 반환하는데 해당 하는 객체를 통해서 insert_id에 접근할 수 있다

### orderdBook insert

```jsx
const order = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let values = [];
  let order_id = 2;
  // let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
  // const delivery_id = SELECT max(id) FROM delivery;
  // let values = [delivery.address, delivery.receiver, delivery.contact];
  // sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
  // values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  sql = `INSER INTO orderdBook (order_id, book_id, quantitiy) VALUES ?;`;
  items.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  conn.query(sql, **[values]**, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 해당 test 코드에서 배열을 한번에 query에 값으로 사용하기 위해서는 인자로 배열을 그대로 삽입해야한다 ⇒ BULK COLLECT
