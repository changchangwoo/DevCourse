async function f() {
  return 7; // Promise 객체 반환
}

f().then(
  function (result) {
    console.log("promise resolve : ", result);
  },
  function (error) {
    console.log("promise reject : ", error);
  }
);
