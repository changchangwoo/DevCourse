const express = require("express");
const app = express();
app.listen(1234);

const arr = [1, 2, 3, 4];

const fruits = [
  { id: 1, name: "apple" },
  { id: 2, name: "orange" },
  { id: 3, name: "strawberry" },
  { id: 4, name: "blueberry" },
];

// 과일 전체 조회
app.get("/fruits", (req, res) => {
  res.json(fruits);
});
let findFruit = "";
// 과일 개별 조회
app.get("/fruits/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  var findFruit = fruits.find((f) => f.id === id);
  if (findFruit) res.json(findFruit);
  else res.status(404).send(`전달주신 ${id}로 저장된 과일이 없습니다`);
});
