## 과제

```jsx
/* 이창우 */
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  let { category_id } = req.query;
  if (category_id) {
    let sql = "SELECT * FROM books WHERE cateogry_id =?";
    conn.query(sql, category_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length) return res.status(StatusCodes.OK).json(results);
      else return res.status(StatusCodes.BAD_REQUEST).end();
    });
  } else {
    let sql = "SELECT * FROM books";
    conn.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};
const bookDetail = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let sql = "SELECT * FROM books WHERE id=?";
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
```

```jsx
/* 이창우 */
const express = require("express");
const router = express.Router();
const allCategory = require("../controller/CategoryController.js");
router.use(express.json());

router.get("/", allCategory);

module.exports = router;
```
