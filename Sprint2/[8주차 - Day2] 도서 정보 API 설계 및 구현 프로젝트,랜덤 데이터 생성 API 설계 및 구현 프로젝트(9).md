### 제약 조건 이름 짓기

> fk*기준 테이블명*참조테이블명\_참조키
> fk_cartitems_users_id

- 제약 조건에도 이름이 있어야 하는데 해당 이름이 외래키의 이름과 동일하면 안된다
- Duplicate key name 'user_id_idx' 오류
  - 데이터베이스는 자체적인 인덱스를 가지고 있다 ( 사용자가 설정하지 않아도 자동으로 설정되어진다 ), 해당하는 인덱스를 기반으로 값을 출력할 때 순서를 정할 수 있다, (오름차순 등)
  - 마찬가지로 해당 자체 인덱스도 고유의 이름이 있는데 이는 중복이 되어지면 안된다

### 장바구니 담기 API

```jsx
const addToCart = (req, res) => {
  const { user_id, book_id, quantity } = req.body;
  let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
  let values = [book_id, quantity, user_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

### 장바구니 목록 조회 API

```jsx
const getCartItems = (req, res) => {
  const { user_id } = req.body;
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT JOIN books
    ON cartItems.book_id = books.id
    WHERE user_id = ?;`;

  conn.query(sql, user_id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- SQL문 : cartItems를 기준으로 book_id와 books의 id가 일치하는 테이블을 합치고(LEFT JOIN), 특정한 user_id를 가진 지정한 컬럼들을 출력

### 장바구니 목록 삭제

```jsx
const removeCartItem = (req, res) => {
  const { id } = req.params;
  console.log(id);
  let sql = `DELETE FROM cartitems WHERE user_id = ?;`;
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

### 장바구니에서 선택한 상품 목록 조회

```jsx
SELECT * FROM cartitems WHERE id IN (1,3)
```

- 만약, 컬럼을 찾는 조건이 여러가지인 경우 IN을 사용할 수 있다. id가 1또는 3인 cartitems의 컬럼들을 출력한다
- 장바구니 아이템 목록과, 선택한 상품 목록 조회가 동일한 결과값을 출력하므로 하나의 API 동작하도록 설계 변경
  ```jsx
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
      FROM cartItems LEFT JOIN books
      ON cartItems.book_id = books.id
      WHERE user_id = ? AND cartItems.id IN (?)`;
  ```
  - 그러면 AND cartItems.id IN과 같은 경우 어떻게 값을 삽입해야하지?
  - 그냥 배열 자체를 인자값으로 넣으면 된다

```jsx
const getCartItems = (req, res) => {
  const { user_id, selected } = req.body; // selected는 배열 값
  let values = [user_id, selected]; // 그냥 배열 자체를 넣는다
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT JOIN books
    ON cartItems.book_id = books.id
    WHERE user_id = ? AND cartItems.id IN (?)`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```
