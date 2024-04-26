### SQL JOIN 활용

```jsx
SELECT * FROM books LEFT
JOIN category ON books.category_id = category.id
WHERE books.id = 1
```

- books 테이블에서 category_id와 category 테이블의 id가 일치하는 항목 전부를 LEFT에 붙여 출력, (조건 WHERE) 이때 , books 테이블의 id가 1인 행만 출력

### SQL 데이터베이스 시간 범위 구하기

- 시간 더하기
  - DATE_ADD(기준 날짜, INTERVAL)
- 시간 빼기
  - DATE_SUB(기준 날짜, INTERVAL)
- 시간 범위를 설정해서 SELECT

```jsx
 SELECT * FROM books
 WHERE pub_date
 BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();
```

- 현재 시간 에서 1MONTH 뺀 값과, 현재 사이의 ( = 한달 이내) 의 값들만 출력

### 카테고리 별 신간, 도서 목록 조회

```jsx
const allBooks = (req, res) => {
  let { category_id, news } = req.query;
  let sql = "SELECT * FROM books";
  let values = [];
  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();";
    values = [category_id, news];
  } else if (category_id) {
    sql += " WHERE category_id=?;";
    values = category_id;
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();";
    values = news;
  }
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
```

- 도서 조회 라우터로 요청이 들어왔을 때 쿼리스트링에 category_id, news의 존재 여부에 따라 sql문을 다르게 실행한다
- sql문에 맞춰 values의 값도 다르게 넣어줘야한다

### 데이터베이스 페이징

- 페이징 : 요청에 따라 몇 개씩 보여줄지
  - SELECT \* FROM books; ⇒ 전체 도서 리스트 100개
    - 8개가 필요한 경우? 4개가 필요한 경우?

```jsx
SELECT * FROM books LIMIT 4 OFFSET 8
```

- 프론트엔드 영역에서 오프셋 영역을 설정해서 제공한다
  - 목록에 따른 데이터베이스 조회
