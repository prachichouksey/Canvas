const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.get("/all", (req, res, next) => {
  console.log("Inside get grade!");
  req.body = req.query;
  console.log("Request Body:", req.body);
  req.body.reqtype = "get-grade";
  kafka.make_request("grade", req.body, function(err, result) {
    if (err) {
      console.log("Unable to get grade", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getting grades!");
    } else {
      console.log("grades: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
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
