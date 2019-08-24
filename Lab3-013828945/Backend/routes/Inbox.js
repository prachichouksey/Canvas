const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
router.get("/all", (req, res, next) => {
  console.log("Inside get inbox!");
  console.log(req.params);
  req.body = req.query;
  console.log("Request Body:", req.body);
  req.body.reqtype = "get-messages";
  kafka.make_request("inbox", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch messages", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching messages!");
    } else {
      console.log("messages: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/send", (req, res, next) => {
  console.log("Inside send message!");

  console.log("Request Body:", req.body);
  req.body.reqtype = "send-message";
  kafka.make_request("inbox", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch messages", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in sending message!");
    } else {
      console.log("message sent: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
