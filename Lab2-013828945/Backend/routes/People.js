const express = require("express");
const router = express.Router();

const kafka = require("../kafka/client");
router.get("/all", (req, res, next) => {
  console.log("Inside get people!");
  console.log("Request Body:", req.body);

  //console.log(req.session.user);
  req.body.reqtype = "get-people";
  req.body.courseid = req.query.courseid;
  kafka.make_request("profile", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch people in course details.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching people!");
    } else {
      console.log("People: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
