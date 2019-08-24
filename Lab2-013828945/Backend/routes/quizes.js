const express = require("express");
const dirTree = require("directory-tree");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", function(req, res) {
  let getquestions =
    "Select quizid from quiz where courseid=" +
    sqlconn.escape(req.query.courseid);
  console.log(getquestions);
  sqlconn.query(getquestions, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    }
  });
});

router.get("/questions", function(req, res) {
  console.log(req.query);
  let getquestions =
    "Select questionval, option1,option2,option3,option4 from quiz join questionbank where quiz.question=questionbank.quesid and quiz.quizid=" +
    sqlconn.escape(req.query.quizid);
  console.log(getquestions);
  sqlconn.query(getquestions, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;

// router.get("/submission", function(req, res) {
//   res.send(dirTree(`${__dirname}/../public/files/`));
// });
