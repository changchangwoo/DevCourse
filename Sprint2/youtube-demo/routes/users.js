const express = require("express");
const router = express.Router();
const conn = require("../mariadb.js");

router.use(express.json());

function isExisted(obj) {
  if (Object.keys(obj).length === 0) {
    return false;
  } else {
    return true;
  }
}
// 로그인
router.post("/login", (req, res) => {
  // userId가 디비에 저장된 회원인지 확인
  // pwd도 맞는지 비교
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, (err, results, fields) => {
    var loginUser = results[0];
    if (loginUser && loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되셨습니다`,
      });
    } else if (loginUser && loginUser.password !== password) {
      res.status(400).json({
        message: `비밀번호가 틀렸습니다`,
      });
    } else {
      res.status(404).json({
        message: "회원 정보가 없습니다",
      });
    }
  });
});

// 회원가입
router.post("/join", (req, res) => {
  if (req.body == !{}) {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`,
    });
  } else {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact];
    conn.query(sql, values, (err, results, fields) => {
      res.status(201).json(results);
    });
  }
});

// 회원 개별 조회 및 삭제
// route 메소드 사용
router
  .route("/users/:id")
  .get((req, res) => {
    let { email } = req.body;
    let sql = `SELECT * FROM users WHERE email =?`;
    conn.query(sql, email, (err, results, fields) => {
      if (results.length === 0) {
        res.status(404).json({
          message: "회원 정보가 없습니다",
        });
      } else {
        res.json({ results });
      }
    });
  })
  .delete((req, res) => {
    let { email } = req.body;
    console.log(email);
    let sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email, (err, results, fields) => {
      if (results) {
        res.status(200).json({
          message: `${email}님 그동안 감사했습니다!`,
        });
      } else {
        res.status(404).json({
          message: `삭제 할 이메일을 찾을 수 없습니다`,
        });
      }
    });
  });

module.exports = router;
