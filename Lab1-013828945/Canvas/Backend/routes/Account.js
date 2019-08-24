const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/profile", (req, res, next) => {
  let getprofile =
    "Select * from profile where profileid=" + sqlconn.escape(req.query.userid);
  console.log(getprofile);
  sqlconn.query(getprofile, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send(result[0]);
    }
  });
});

router.put("/profile", function(req, res) {
  console.log(req.body);
  let updateprofile =
    "UPDATE profile SET name =" +
    sqlconn.escape(req.body.username) +
    ", profileimage = " +
    sqlconn.escape(req.body.profileImage) +
    ", email = " +
    sqlconn.escape(req.body.email) +
    ", phone = " +
    sqlconn.escape(req.body.phonenumber) +
    ", aboutMe =" +
    sqlconn.escape(req.body.aboutme) +
    ",city  = " +
    sqlconn.escape(req.body.city) +
    ", country = " +
    sqlconn.escape(req.body.country) +
    ", company = " +
    sqlconn.escape(req.body.company) +
    ", school = " +
    sqlconn.escape(req.body.school) +
    ", hometown = " +
    sqlconn.escape(req.body.hometown) +
    ", language = " +
    sqlconn.escape(req.body.language) +
    ", gender = " +
    sqlconn.escape(req.body.gender) +
    " WHERE profileid = " +
    sqlconn.escape(req.body.userid);
  sqlconn.query(updateprofile, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: "success" });
    }
  });
});

module.exports = router;
