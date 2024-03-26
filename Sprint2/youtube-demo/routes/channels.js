const express = require("express");
const router = express.Router();
router.use(express.json());
const db = new Map();
let idx = 1;

const notFoundChannel = () => {
  return "조회할 채널이 없습니다";
};
router
  .route("/")
  .get((req, res) => {
    let { userId } = req.body;

    if (db.size && userId) {
      let channels = [];
      db.forEach((value, key) => {
        if (value.userId === userId) channels.push(value);
      });
      if (channels.length !== 0) {
        res.status(200).json(channels); // JSON Array
      } else {
        res.status(404).json({ message: notFoundChannel() });
      }
    } else {
      res.status(404).json({
        message: notFoundChannel(),
      });
    }
  }) // 전체 조회
  .post((req, res) => {
    if (req.body.channelTitle) {
      db.set(idx++, req.body);
      res.status(201).json({
        message: `${db.get(idx - 1).channelTitle}채널을 응원합니다!`,
      });
    } else {
      res.status(404).json({
        message: `오류발생`,
      });
    }
  }); // 생성;

router
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    if (db.get(id)) {
      res.status(200).json(db.get(id));
    } else {
      res.status(404).json({
        message: notFoundChannel(),
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
        message: notFoundChannel(),
      });
    }
  }); // 개별 삭제;

module.exports = router;
