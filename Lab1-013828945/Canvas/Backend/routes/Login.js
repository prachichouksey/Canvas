const encrypt = require("../utils/createkey");

const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.post("/signup", (req, res, next) => {
  console.log("Request for signup" + req.body.username);
  let encryptpass = encrypt(req.body.password);
  let insertuser = `Insert into user(username,password,type) values(${sqlconn.escape(
    req.body.username
  )},${sqlconn.escape(encryptpass)},${sqlconn.escape(req.body.type)})`;
  console.log(insertuser);
  sqlconn.query(insertuser, (err, result) => {
    if (err) {
      console.log("Error in inserting" + err);
      res.send({ message: err });
    } else {
      const insertId = result.insertId;
      let insertprofile =
        "Insert into profile(profileid,name,email) values(" +
        sqlconn.escape(result.insertid) +
        "," +
        sqlconn.escape(req.body.username) +
        "," +
        sqlconn.escape(req.body.email) +
        ")";
      sqlconn.query(insertprofile, (err, result) => {
        if (err) {
          console.log("Error in inserting" + err);
        } else {
          res.send({ message: "success", id: insertId });
        }
      });
    }
  });
});

router.post("/signin", (req, res, next) => {
  let encryptpass = encrypt(req.body.password);
  let getuser =
    "Select * from user where userid=" +
    sqlconn.escape(req.body.userid) +
    " AND password=" +
    sqlconn.escape(encryptpass);
  console.log("Login query: " + getuser);
  sqlconn.query(getuser, (err, result) => {
    if (err) {
      res.status(404);
    } else {
      let resultExtract = result;
      if (resultExtract.length > 0) {
        res.cookie("userid", resultExtract[0].UserId, {
          MaxAge: 30000,
          path: "/",
          httpOnly: false
        });
        res.cookie("password", resultExtract[0].Password, {
          MaxAge: 30000,
          path: "/",
          httpOnly: false
        });
        console.log(resultExtract[0].Type);
        res.send(resultExtract[0].Type);
      } else {
        res.status(404).send({ message: "unauth" });
      }
    }
  });
});

module.exports = router;
