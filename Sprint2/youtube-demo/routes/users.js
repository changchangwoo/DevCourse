const express = require("express");
const router = express.Router();
router.use(express.json());
const db = new Map();
let idx = 1;

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
  const { userId, password } = req.body;
  let loginUser = {};

  db.forEach((value) => {
    if (value.userId === userId) {
      loginUser = value;
    }
  });
  if (isExisted(loginUser)) {
    if (loginUser.password === password) {
      res.status(400).json({
        message: "로그인 성공",
      });
    } else {
      res.status(400).json({
        message: "비밀번호가 틀렸습니다",
      });
    }
  } else {
    res.status(400).json({
      message: "회원 정보가 없습니다",
    });
  }
});

// 회원가입
router.post("/join", (req, res) => {
  if (req.body == !{}) {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`,
    });
  } else {
    db.set(idx++, req.body);
    console.log(db);
    res.status(201).json({
      message: `${db.get(idx - 1).name}님 회원가입을 축하합니다`,
    });
  }
});

// 회원 개별 조회 및 삭제
// route 메소드 사용
router
  .route("/users/:id")
  .get((req, res) => {
    let { userId } = req.body;
    const user = db.get(userId);
    if (!user) {
      res.status(404).json({
        message: "회원 정보가 없습니다",
      });
    } else {
      res.json({
        userId: user.userId,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    let { userId } = req.body;
    const user = db.get(userId);
    if (!user) {
      res.status(404).json({
        message: "회원 정보가 없습니다",
      });
    } else {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 다음에 또 뵙겠습니다`,
      });
    }
  });

module.exports = router;
