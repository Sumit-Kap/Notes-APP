const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./routes/controller");
const mysqlConnection = require("./connection");
var app = express();

app.use(bodyParser.json());
app.use("/notes", controller);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
