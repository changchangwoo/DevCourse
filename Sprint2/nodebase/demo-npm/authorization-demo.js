const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.listen(1234);

// GET + "/jwt" : 토큰 발행
app.get("/jwt", function (req, res) {
  const token = jwt.sign({ changwoo: "lee", hojin: "kkk" }, "secret");
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  res.status(200).send("토큰발행 완료");
});

app.get("/jwt/decoded", function (req, res) {
  let receviedJWT = req.headers["authorization"];
  console.log(receviedJWT);
  var decoded = jwt.verify(receviedJWT, "secret");
  res.send(decoded);
});
