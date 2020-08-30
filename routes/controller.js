const express = require("express");
const mysqlConnection = require("../connection");
var jwt = require("jwt-simple");
const Router = express.Router();
const config = require("../appConfig/config");

Router.post("/app/user", (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;
  let post = [userName, password, 24];
  mysqlConnection.query(
    "Insert into User(Username,Password,Age) values (?,?,?)",
    post,
    (err, rows, field) => {
      if (!err) {
        res.send({ status: "account created" });
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/app/user/auth", (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;
  mysqlConnection.query(
    "Select * from User where Username=? and Password=?",
    [userName, password],
    (err, rows, field) => {
      if (!err) {
        console.log("printing", rows);
        res.send({ status: "success", userId: rows[0].UserId });
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/app/sites", (req, res) => {
  let userId = req.query.user;
  let notes = req.body.note;
  console.log(notes);
  var token = jwt.encode(notes, config.authTokenSalt);
  console.log(token);
  let post = [userId, token];

  mysqlConnection.query(
    "Insert into note(UserId,data) values (?,?)",
    post,
    (err, rows, field) => {
      if (!err) {
        console.log("printing", rows);
        res.send({ status: "success" });
      } else {
        console.log(err);
      }
    }
  );
});

Router.get("/app/sites/list/", (req, res) => {
  let userId = req.query.user;
  let notes = req.body.note;
  mysqlConnection.query(
    "select * from note where UserId=?",
    userId,
    (err, rows, field) => {
      if (!err) {
        console.log("printing", rows);
        let response = [];
        for (let i = 0; i < rows.length; i++) {
          response.push({
            userId: rows[i].UserId,
            Notes: jwt.decode(rows[i].data, config.authTokenSalt),
          });
        }
        res.send({ data: response });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
