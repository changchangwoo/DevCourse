# [4주차 - Day3] Node.js 및 Express.js를 사용한 서버 개발 실습(1)

### POST

- 생성(=등록) : POST
  - GET으로 요청을 하는 경우 URL로 요청값이 드러난다. 만약 아이디, 패스워드, 주소와 같은 개인정보와 관련된 경우 요청값을 숨겨야하는데 이러한 경우 GET이 아닌 POST를 사용한다

### POSTMAN

- GET과 달리 POST는 웹 브라우저로 테스트가 안되기 때문에 **postman**이라는 웹 앱의 도움을 받아서 확인이 가능하다
- 워크스페이스의 ADD 버튼을 통한 collections 생성으로 API 요청 데이터 관리가 가능하다

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6f949946-fe6f-4146-bb5f-172d0fafdabf/47cde9e5-5007-4f10-9b23-5f4f6334e70a/Untitled.png)

- 다음과 같이 요청 메소드, 주소를 설정하고 body의 출력 값을 확인할 수 있다
- **POSTMAN 장점**
  - 에러가 나타나면 HTML 페이지의 전체 태그를 반환하기에 확인이 편하다
  - JSON 형식의 파일을 출력할 때 RAW 형태의 웹과 달리 Pretty 형태로 가독성있게 표기한다

### POST req, res 구현 & 테스트

- 클라이언트에서 서버로 데이터를 요청할 때 Body 영역에 값을 추가할 수 있다. 이는 request의 body 프로퍼티를 통해 값을 읽는게 가능하다

```jsx
app.post("/test", function (req, res) {
  console.log(req.body); // .body 프로퍼티로 body의 값을 읽을 수 있다
  res.send(req.body);
});
```

**이슈**) express 서버에서 응답 데이터의 body값을 JSON 형식으로 받게 되는 경우 undefined 오류가 출력된다 ⇒ 이는 app.use(express.json()) 코드를 추가해서 JSON파일의 값을 추가로 읽을 수 있다

```jsx
app.use(express.json()); //express.json을 사용하면
// request로 받아오는 json파일의 값을 읽을 수 있다.
```

### API 설계 (URL, method)

- req와 res에 어떠한 동작이 이뤄질지 구체적으로 명세
  - 예시
  0. 전체 유튜버 “조회” GET /youtubers

  1. 개별(id) 유튜버 “조회” GET /youtuber/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 출력
  - req : params.id = map에 저장된 key 값을 전달
  - res : map에서 id로 객체를 조회해서 전달
  2. 유튜버 ‘등록’ POST /youtuber
  - req : body ≤ channelTitle, sub = 0, videoNum = 0 신규 유튜버 정보 전달
  - res : “message“: “chaanleTitle님, 유튜버 생활을 응원합니다”

### 오류 해결

- 스택 오버플로우같은 개발자 커뮤니티를 활용한다면 도움이 많이된다
- 에러 메세지를 복붙해서 구글링부터 해보자
