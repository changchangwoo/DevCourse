const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);
const db = new Map();
let idx = 1;

app
  .route("/channels")
  .get((req, res) => {
    if (db.size) {
      var channels = [];
      db.forEach((value, key) => {
        channels.push(value);
      });
      res.json(channels); // JSON Array
    } else {
      res.status(404).json({
        message: `조회할 채널이 없습니다`,
      });
    }
  }) // 전체 조회
  .post((req, res) => {
    db.set(idx++, req.body);
    res.status(201).json({
      message: `${db.get(idx - 1).channelTitle}채널을 응원합니다!`,
    });
  }); // 생성;

app
  .route("/channels/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    if (db.get(id)) {
      res.status(200).json(db.get(id));
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
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
    let channel = db.get(id);

    if (channel) {
      db.delete(id);
      res.status(200).json({
        message: `${channelTitle}이 정상적으로 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  }); // 개별 삭제;
