### 좋아요 추가 구현

```jsx
const addLike = (req, res) => {
  let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
  const { id } = req.params;
  const { user_id } = req.body;
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 쿼리와 바디로 요청받은 값을 sql문을 통해 INSERT

### 좋아요 삭제 구현

```jsx
const removeLike = (req, res) => {
  let sql = `DELETE FROM likes WHERE user_id =? AND liked_book_id =?`;
  const { id } = req.params;
  const { user_id } = req.body;
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 쿼리와 바디로 요청받은 값을 sql문을 통해 DELETE

### count()

```jsx
select count(*) FROM likes WHERE liked_book_id = 3
```

- count함수는 조건에 해당하는 값의 개수를 반환하는 쿼리문
- likes 테이블의 liked_book_id가 3인 값들의 개수를 반환한다

### AS

- as는 Alias, 긴 테이블 이름을 Query문 내에 정리하기 위해서 사용한다
- 서브 쿼리를 사용하여 likes 테이블에서 반환된 값을 likes라는 별칭을 붙여준다
  - 해당 결과값에 별칭 likes라는 컬럼으로 값이 포함되어 출력된다

```sql
SELECT *,
(SELECT count(*) FROM likes WHERE liked_book_id = 1) AS likes
FROM books;
```

### 서브 쿼리 : 쿼리 안에 쿼리

- 주 쿼리의 일부로서 조건을 결정하거나, 결과를 계산할 때 사용되어진다
- 도서 테이블 전체조회

```sql
SELECT * FROM books;
SELECT 컬럼명1, 컬럼명2 ... FROM 테이블명;
```

- 도서 테이블 전체 조회 + 컬럼 1개 추가하기

```sql
SELECT *, 값 AS 새로 추가할 컬럼명 FROM books
=>
SELECT *, (각 행마다 likes 테이블에 liked_book_id로 가지고 있는 행수) AS likes FROM books
=>
**SELECT *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes FROM books**
```

### EXSIST

```sql
SELECT EXISTS (SELECT * FROM likes WHERE user_id = 1 AND liked_book_id=9)
```

- 괄호 내부 테이블의 결과가 존재하면 1을 반환하고 아닌 경우 0을 반환한다

### BooksController 수정

```jsx
/* 이창우 */

const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

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
  values.push(parseInt(limit), offset);
  sql += " LIMIT ? OFFSET ?;";
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

const bookDetail = (req, res) => {
  let { book_id } = req.params;
  let { user_id } = req.body;
  let sql = `SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked FROM books LEFT JOIN category ON books.category_id = category.category_id WHERE books.id = ?;`;
  let values = [user_id, book_id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send(results);
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
```

- 전체 도서 조회의 디폴트 쿼리문을

```sql
"SELECT *, (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books;
```

- 다음과 같이 바꿔 좋아요 수를 계산한 컬럼으로서 출력된다
- 개별 도서 조회의 쿼리문을

```sql
USE bookstore;
SELECT *, (SELECT count(*) FROM likes
WHERE liked_book_id=books.id) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id=1 AND liked_book_id=1))
AS liked FROM books LEFT JOIN category ON books.category_id = category.category_id
WHERE books.id = 1;
```

- 으로 바꾸어 좋아요 수 및 좋아요 클릭 되었는지에 대한 결과를 표시한다
