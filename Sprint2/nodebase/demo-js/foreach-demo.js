/* foreach-demo.js */
const arr = [1, 2, 3];

// 객체 (또는 배열)에서 요소를 하나 꺼낸 다음
// 매개 변수로 그 요소를 전달하여 호출하는 콜백함수
const foreachArr = arr.forEach((a, b, c) => {
  console.log(`a : ${a}, b : ${b}, c : ${c}`);
  return a * 2;
});

const mapArr = arr.map((a, b, c) => {
  console.log(`a : ${a}, b : ${b}, c : ${c}`);
  return a * 2;
});

console.log(`foreach로 return : ${foreachArr},
map으로 return : ${mapArr}`);
// // Map에서 foreach의 응용
// let map = new Map();
// map.set(7, "seven");
// map.set(8, "eight");
// map.set(9, "nine");
// map.forEach((a, b) => {
//   console.log(`a : ${a}, b : ${b}`);
// });
