const express = require("express");
const conn = require("../mariadb.js");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
router.use(express.json());

const validate = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
};

const notFoundChannel = () => {
  return "조회할 채널이 없습니다";
};
router
  .route("/")
  .get(
    [
      body("userId").notEmpty().isInt().withMessage("userId는 숫자여야한다"),
      validate,
    ],
    (req, res) => {
      // 전체 조회
      let { userId } = req.body;
      let sql = `SELECT * FROM channels WHERE user_id =?`;

      conn.query(sql, userId, (err, results, fields) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: notFoundChannel(),
          });
        }
      });
    }
  )
  .post(
    [
      body("userId").notEmpty().isInt().withMessage("userId는 숫자여야한다"),
      body("name").notEmpty().isString().withMessage("name은 문자로 입력하자"),
    ],
    (req, res) => {
      // 유효성 검사
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      // 생성;
      let { name, userId } = req.body;

      let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
      let values = [name, userId];
      conn.query(sql, values, (err, results) => {
        // SQL 에러처리
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  );

router
  .route("/:id")
  .get(
    // 개별 조회
    param("id").notEmpty().withMessage("채널 id가 비어있으면 안됩니다"),
    (req, res) => {
      err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      let { id } = req.params;
      id = parseInt(id);
      let sql = `SELECT * FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end;
        } else if (results.length) res.status(200).json(results);
        else notFoundChannel();
      });
    }
  )
  .put(
    [
      param("id").notEmpty().withMessage("채널 id가 비어있으면 안됩니다"),
      body("name").notEmpty().isString().withMessage("채널명 오류"),
    ],
    (req, res) => {
      err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      let { id } = req.params;
      id = parseInt(id);
      let { name } = req.body;
      let sql = `UPDATE channels SET name =? WHERE id=?`;
      let values = [name, id];
      conn.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows === 0) {
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  ) // 개별 수정
  .delete(
    param("id").notEmpty().withMessage("채널 id가 비어있으면 안됩니다"),
    (req, res) => {
      err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      let { id } = req.params;
      id = parseInt(id);
      let sql = `DELETE FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  ); // 개별 삭제;

module.exports = router;
