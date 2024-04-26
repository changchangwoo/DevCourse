let promise = new Promise(function (reslove, reject) {
  setTimeout(() => reslove("완료!"), 3000);
})
  .then(
    function (result) {
      console.log(result);
      return result + "!!!!";
    },
    function (error) {}
  )
  .then(
    function (result) {
      console.log(result);
      return result + "!!!!";
    },
    function (error) {}
  );
