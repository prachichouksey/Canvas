const express = require("express");
const dirTree = require("directory-tree");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", function(req, res) {
let getquestions="Select quizid from quiz where courseid="+sqlconn.escape(req.query.courseid);
console.log(getquestions);
sqlconn.query(getquestions, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    }
  });
})


router.get("/questions", function(req, res) {
  console.log(req.query)
let getquestions="Select questionval, option1,option2,option3,option4 from quiz join questionbank where quiz.question=questionbank.quesid and quiz.quizid="+sqlconn.escape(req.query.quizid);
console.log(getquestions);
sqlconn.query(getquestions, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    }
  });
})


module.exports = router;

//   if (Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   let uploadFile = req.files.file;
//   const fileName = req.files.file.name;

//   uploadFile.mv(`${__dirname}/../public/files/${fileName}`, function(err) {
//     if (err) return res.status(500).send(err);
//     res.json({
//       file: `public/${req.files.file.name}`
//     });
//   });
// });

// router.get("/submission", function(req, res) {
//   res.send(dirTree(`${__dirname}/../public/files/`));
// });



