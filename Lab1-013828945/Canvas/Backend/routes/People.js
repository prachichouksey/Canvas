const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");

router.get("/all", (req, res, next) => {
    let getpeople =
        "SELECT u.username,u.type,u.userid FROM user u join course_allocation c where u.userid=c.studentid and c.courseid=" +
        sqlconn.escape(req.query.courseid);

    console.log(getpeople);
    sqlconn.query(getpeople, (err, result) => {
        if (err) {
            console.log("Error in query" + err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

module.exports = router;
