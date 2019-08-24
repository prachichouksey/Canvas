const express = require("express");
const router = express.Router();

const kafka = require("../kafka/client");

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

router.post("/set", (req, res) => {
  console.log("Inside set grade!");

  console.log("Request Body:", req.body);
  req.body.reqtype = "set-grade";
  kafka.make_request("grade", req.body, function(err, result) {
    if (err) {
      console.log("Unable to set grade", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in setting grade!");
    } else {
      console.log("grade set: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
