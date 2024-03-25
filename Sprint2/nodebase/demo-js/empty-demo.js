const obj1 = {};
const obj2 = { message: "안 빔" };
const num = 1;
const str = "one";

function isEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}

console.log(Object.keys(obj1).length === 0);
console.log(Object.keys(obj2).length === 0);
console.log(Object.keys(num).length === 0);
console.log(Object.keys(str).length === 0);
