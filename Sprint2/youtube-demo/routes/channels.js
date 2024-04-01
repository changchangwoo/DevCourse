const express = require("express");
const conn = require("../mariadb.js");
const router = express.Router();
router.use(express.json());

const notFoundChannel = () => {
  return "조회할 채널이 없습니다";
};
router
  .route("/")
  .get((req, res) => {
    // 전체 조회
    let { user_id } = req.body;
    let sql = `SELECT * FROM channels WHERE user_id =?`;
    user_id &&
      conn.query(sql, user_id, (err, results, fields) => {
        if (results.length) {
          res.json(results);
        } else {
          res.status(404).json({
            message: notFoundChannel(),
          });
        }
      });
  })
  .post((req, res) => {
    // 생성;
    let { name, user_id } = req.body;
    if ((name, user_id)) {
      let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
      let values = [name, user_id];
      conn.query(sql, values, (err, results) => {
        res.status(201).json(results);
      });
    } else {
      res.status(404).json({
        message: `오류발생`,
      });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let sql = `SELECT * FROM channels WEHRE id = ?`;
    conn.query(sq, id, (err, results) => {
      if (results.length) res.status(200).json(results);
      else notFoundChannel();
    });
  }) // 개별 조회
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    let oldTitle = channel.channelTitle;
    if (channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);
      res.json({
        message: `채널명이 정상적으로 수정되었습니다. 기존${oldTitle} => 수정 후 ${newTitle}`,
      });
    } else {
      res.status(404).json({
        message: `오류 발생`,
      });
    }
  }) // 개별 수정
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let sql = `DELETE FROM channels WHERE id = ?`;
    conn.query(sql, id, (err, results, fields) => {
      if (results) {
        res.status(200).json({
          message: `${id}님 그동안 감사했습니다!`,
        });
      } else {
        res.status(404).json({
          message: `삭제 할 이메일을 찾을 수 없습니다`,
        });
      }
    });
  }); // 개별 삭제;

module.exports = router;
