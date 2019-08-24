const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", (req, res, next) => {
  let getgrade =
    "SELECT g.gradeid,g.grade,a.marks,a.question FROM grades g join assignment a where g.assignid=a.assignid and g.userid=" +
    sqlconn.escape(req.query.userid) +
    " and g.courseid=" +
    sqlconn.escape(req.query.courseid);

  console.log(getgrade);
  sqlconn.query(getgrade, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

router.post("/set", (res, req) => {
  console.log(req.body);
  let setGrade = `insert into grades 
            (courseid,userid,grade,assignid)
        values
            (
                ${sqlconn.escape(req.body.courseid)},
                ${sqlconn.escape(req.body.userid)},
                ${sqlconn.escape(req.body.grade)},
                ${sqlconn.escape(req.body.assignid)}
            )
      `;
  sqlconn.query(setGrade, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
