const express = require("express");
const app = express();
app.listen(1234);
app.use(express.json());
let index = 1;

const db = new Map();

let youtuber1 = {
  channelTitle: "십오야",
  sub: "593만명",
  videoNum: "993개",
};
let youtuber2 = {
  channelTitle: "침착맨",
  sub: "227만명",
  videoNum: "6.6천개",
};
let youtuber3 = {
  channelTitle: "테오",
  sub: "54.8만명",
  videoNum: "726개",
};

db.set(index++, youtuber1);
db.set(index++, youtuber2);
db.set(index++, youtuber3);

app.get("/youtubers/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  console.log(db.get(id));
  if (db.get(id) === undefined) {
    res.json({ message: `진짜 지성합니다... 못찾겠어요` });
  } else {
    res.json(db.get(id));
  }
});

app.post("/youtubers", (req, res) => {
  let channelTitle = req.body.channelTitle;
  db.set(index++, {
    channelTitle: channelTitle,
    sub: "0명",
    videoNum: "0개",
  });
  res.json({ meessage: `${channelTitle}님아 환영합니다` });
});

app.get("/youtubers", (req, res) => {
  var youtubers = {}; // 클린코드를 지향한다면 복수형과 단수형의 구분을 명확히하자
  db.forEach((youtuber, index) => {
    youtubers[index] = youtuber;
  });
  res.json(youtubers);
});

app.delete("/youtubers/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  if (db.get(id) === undefined) {
    res.json({ message: "삭제할 아이디를 찾을 수 없어요" });
  } else {
    let youtuber = db.get(id);
    res.json({ message: `${youtuber.channelTitle}님 그동안 즐거웠습니다…` });
    db.delete(id);
  }
});
app.delete("/youtubers", (req, res) => {
  if (db.size >= 1) {
    db.clear();
    res.json({ message: "전체 유튜버가 삭제되었습니다....." });
  } else {
    res.json({ message: "삭제할 유튜버가 없긴 합니다" });
  }
});
app.put("/youtubers/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let youtuber = db.get(id);
  console.log(youtuber);
  if (youtuber !== undefined) {
    let prevChannelTitle = youtuber.channelTitle;
    let newChannelTitle = req.body.channelTitle;
    youtuber.channelTitle = newChannelTitle;
    res.json({
      message: `${prevChannelTitle}님 ${newChannelTitle}로 채널명이 변경되었습니다!`,
    });
  } else {
    res.json({
      message: `요청하신 ${id}번은 없는 번호입니다`,
    });
  }
});
