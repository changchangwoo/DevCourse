var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config(); // 환경변수 값을 불러오기 위해서는 config를 사용해야한다
console.log(process.env.PRIVATE_KEY);

var token = jwt.sign(
  { changwoo: "lee", hojin: "kkk" },
  process.env.PRIVATE_KEY // process.env로 접근 후 설정한 환경 변수 값을 불러온다
);
// 서명 = 토큰 발행
// token 생성 = jwt 서명을 했다! ( 페이로드, 나만의 암호키 ) + SHA256

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인 할 수 있다.
