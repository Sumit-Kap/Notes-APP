const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "notes",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("connection failed", err);
  }
});

module.exports = mysqlConnection;
