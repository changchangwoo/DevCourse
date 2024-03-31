const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Youtube",
  dateStrings: true,
});

connection.query("SELECT * FROM `users`", (err, results, fields) => {
  console.log(results[0].id);
  console.log(results[0].email);
  console.log(results[0].name);
  console.log(results[0].created_at);
});
