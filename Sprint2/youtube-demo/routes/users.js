const express = require("express");
const router = express.Router();
const conn = require("../mariadb.js");
const { body, validationResult } = require("express-validator");

// jwt 모듈
const jwt = require("jsonwebtoken");

// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).json(err.array());
  }
};

// 로그인
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    validate,
  ],
  (req, res) => {
    // userId가 디비에 저장된 회원인지 확인
    // pwd도 맞는지 비교
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, results, fields) => {
      var loginUser = results[0];
      if (loginUser && loginUser.password === password) {
        // token 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY
        );
        res.status(200).json({
          message: `${loginUser.name}님 로그인 되셨습니다`,
          token: token,
        });
      } else {
        res.status(404).json({
          message: "이메일 또는 비밀번호가 틀렸습니다......ㅠㅠ",
        });
      }
    });
  }
);

// 회원가입
router.post(
  "/join",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
    body("name").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    body("contact").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    validate,
  ],
  (req, res) => {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact];
    conn.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(201).json(results);
    });
  }
);

// 회원 개별 조회 및 삭제
// route 메소드 사용
router
  .route("/users/:id")
  .get(
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `SELECT * FROM users WHERE email =?`;
      conn.query(sql, email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end;
        }
        res.status(200).json(results);
      });
    }
  )
  .delete(
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      console.log(email);
      let sql = `DELETE FROM users WHERE email = ?`;
      conn.query(sql, email, (err, results) => {
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
  );

module.exports = router;
