// Promise "객체" : 약속을 지키는 친구

let promise = new Promise(function (resolve, reject) {
  // executor : 이 친구가 할 일
  setTimeout(() => {
    resolve("완료");
  }, 3000);
  // 할 일을 성공하면 reslove 결과
  // 실패하면 reject
}); // 친구 소환,
// 매개 변수로 함수를 받는다

// promise의 기본 메소드 : promise가 일 다하고 (= 약속 다 지키고) 호출해야하는 함수
promise.then(
  function (result) {
    console.log(result);
  },
  function (err) {}
);
