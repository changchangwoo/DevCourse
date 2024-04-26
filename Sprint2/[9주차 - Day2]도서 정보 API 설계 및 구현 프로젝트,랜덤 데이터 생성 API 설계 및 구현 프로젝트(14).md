### 장바구니 조회 수정

```jsx
const getCartItems = (req, res) => {
  const { selected } = req.body;
  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었다",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰이다...",
    });
  } else {
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT JOIN books
    ON cartItems.book_id = books.id
    WHERE user_id = ?`;
    let values = [authorization.id];
    if (selected) {
      // 주문서 작성 시 '선택한 장바구니 목록 조회'
      sql += ` AND cartItems.id IN (?)`;
      values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};
```

- body값에 selected가 있는 경우 ⇒ `AND [cartItems.id](http://cartItems.id) IN (?)`을 추가하여 선택되어진 항목이 출력되도록 표시
- body값에 selected가 없는 경우 ⇒ 사용자가 가지고 있는 장바구니 목록이 전부 출력되도록 표시

### 주문하기

- 동일하게 ensureAuthorization 로직 추가

### 개별 도서 조회 API 수정

```jsx
const bookDetail = (req, res) => {
  // 로그인 상태가 아니면 => liked 빼고 보내주면 되고
  // 로그인 상태이면 => liked 추가해서 보내주면 된다

  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었다",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰이다...",
    });
  } else if (authorization instanceof ReferenceError) {
    let book_id = req.params.id;
    let sql = `SELECT *, (SELECT count(*) FROM likes 
WHERE liked_book_id=books.id) AS likes FROM books 
LEFT JOIN category ON books.category_id = category.category_id 
WHERE books.id = ?;`;
    let values = [book_id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).send(results);
    });
  } else {
    let sql = `SELECT *, (SELECT count(*) FROM likes 
WHERE liked_book_id=books.id) AS likes, 
(SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) 
AS liked FROM books LEFT JOIN category ON books.category_id = category.category_id 
WHERE books.id = ?;
`;
    let book_id = req.params.id;
    let values = [authorization.id, book_id, book_id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).send(results);
    });
  }
};
```

- 만약 토큰이 없는 경우, ReferenceError로 분류가 되어 해당하는 로직이 동작하여 기존의 유저 id를 가지고 좋아요 데이터를 추출하던 sql이 아닌, 책 상세 정보만을 출력하는 로직으로 동작

### 로그인 상태에서 동작해야 하는 기능들

```jsx
  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었다",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰이다...",
    });
  } else {
  .
  .
  }
```

- 다음과 같이 토큰을 받고 사용자 아이디가 존재하는지 확인한 후에 동작을 수행하는 로직을 추가

### 전체 도서 조회 pagination 추가

```jsx
SELECT * FROM bookstore.books LIMIT 4 OFFSET 0;
SELECT count(*) FROM bookstore.books;

SELECT SQL_CALC_FOUND_ROWS * FROM bookstore.books LIMIT 4 OFFSET 0;
SELECT found_rows();
```

- 다음과 같은 두 가지 방법으로 임의 개수의 books 데이터와 그 테이블의 전체 rows 개수를 찾아올 수 있다
- found_rows()의 경우 앞에 동작한 쿼리의 정보를 기억해놨다 해당 테이블의 rows 개수를 전부 반환한다

```jsx
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;
  let offset = limit * (currentPage - 1);
  let values = [];
  let sql =
    "SELECT *, (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books";

  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id=?";
    values = [category_id];
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }
  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    console.log(results);
  });

  sql = "SELECT found_rows();";
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 기존 limit offset으로 페이지에 따라 개수를 반환하고, 이후 sql 변수를 “SELECT found_rows()” 하여 다시 쿼리문을 동작함으로 테이블의 rows 총 개수를 반환받는다

```jsx
sql = "SELECT found_rows();";
conn.query(sql, values, (err, results) => {
  if (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  let pagination = {};
  pagination.currentPage = parseInt(currentPage);
  pagination.totalCount = results[0]["found_rows()"];
  allBooksRes.pagination = pagination;

  return res.status(StatusCodes.OK).json(allBooksRes);
});
```

- 현재 페이지, 전체페이지를 추가한 결과값을 반환한다
