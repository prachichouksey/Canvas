const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", (req, res, next) => {
    let getannouncement =
        "select * from announcement where courseid=" +
        sqlconn.escape(req.query.courseid);

    console.log(getannouncement);
    sqlconn.query(getannouncement, (err, result) => {
        if (err) {
            console.log("Error in query" + err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});
router.get("/details", (req, res, next) => {
    let getannouncement =
        "select * from announcement where annid=" + sqlconn.escape(req.body.annid);

    console.log(getannouncement);
    sqlconn.query(getannouncement, (err, result) => {
        if (err) {
            console.log("Error in query" + err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

router.get("/create", (req, res, next) => {
    if (localStorage.getItem(type) === "Faculty") {
        let insertann =
            "insert into announcement(heading,details,courseid) values(" +
            sqlconn.escape(req.body.heading) +
            "," +
            sqlconn.escape(req.body.details) +
            "," +
            sqlconn.escape(req.body.courseid) +
            ")";
        console.log(insertann);
        sqlconn.query(insertann, (err, result) => {
            if (err) {
                console.log("Error in query" + err);
            } else {
                console.log(result);
            }
        });
    } else {
        res.end("Not enough privileges");
    }
});

module.exports = router;
