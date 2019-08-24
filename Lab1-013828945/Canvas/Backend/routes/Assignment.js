const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", (req, res, next) => {
    let getassignments =
        "select * from assignment where courseid=" +
        sqlconn.escape(req.query.courseid);
    console.log(getassignments);
    sqlconn.query(getassignments, (err, result) => {
        if (err) {
            console.log("Error in fetching" + err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});
router.get("/details", (req, res, next) => {
    let assigndetails =
        "SELECT a.assignid,question,details,studentid FROM assignment a join assignment_submission s where a.assignid=s.assignid and a.assignid=" +
        sqlconn.escape(req.query.assignid);
    console.log(assigndetails);
    sqlconn.query(assigndetails, (err, result) => {
        if (err) {
            console.log("Error in fetching" + err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
    /*assigndetails =
      "SELECT a.assignid,question,details,studentid FROM assignment a join assignment_submission s where a.assignid=s.assignid and a.courseid=" +
      sqlconn.escape(req.query.courseid);
    if (req.query.type === "Student") {
      assigndetails += "and s.studentid=";
      sqlconn.escape(req.query.userid);
    }*/
});

router.post("/add", (req, res, next) => {
    if (req.query.type === "Faculty") {
        let addassignment =
            "insert into assignment(courseid,question,details,duedate) values(" +
            sqlconn.escape(req.body.courseid) +
            "," +
            sqlconn.escape(req.body.question) +
            "," +
            sqlconn.escape(req.body.details) +
            "," +
            sqlconn.escape(req.body.duedate) +
            ")";

        console.log(addassignment);
        sqlconn.query(addassignment, (err, result) => {
            if (err) {
                console.log("Error in inserting" + err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    }
});

router.post("/submit", (req, res, next) => {
    if (req.query.type === "Student") {
        let submitassignment =
            "insert into assignment_submission(assignid,studentid,solution) values(" +
            sqlconn.escape(req.body.assignid) +
            "," +
            sqlconn.escape(req.body.userid) +
            "," +
            sqlconn.escape(req.body.solution) +
            ")";

        console.log(submitassignment);
        sqlconn.query(submitassignment, (err, result) => {
            if (err) {
                console.log("Error in inserting" + err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    }
});

module.exports = router;
