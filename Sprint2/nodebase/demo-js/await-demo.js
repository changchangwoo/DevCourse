async function f() {
  return 7; // Promise 객체 반환
}

// async-await : Promise 객체를 좀 더 쉽고 편하게 사용하도록 하는 문법
// 비동기 처리가 더 쉽다

// await 는 async 함수 안에서만 동작
// await이 Promise 객체.then() 이 메소드를 좀 더 쉽게 사용할 수 있는 방법
// async 두번째 기능
// Promise 객체가 일이 끝날 때까지 기다릴 수 있는 공간을 제공한다

async function f2() {
  let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("첫 번째!"), 3000);
  });
  let result1 = await promise1;

  console.log(result1);

  let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("두 번째! + " + result1), 3000);
  });

  let result2 = await promise2;
  console.log(result2);

  let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("세 번째! +"), 3000);
  });

  let result3 = await promise3;
  console.log(result3);
}

f2();
