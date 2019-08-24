const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
router.get("/all", (req, res, next) => {
  console.log("Inside get announcement!");
  console.log(req.params);
  req.body = req.query;
  console.log("Request Body:", req.body);
  req.body.reqtype = "get-announcement";
  kafka.make_request("announcement", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch announcements", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching announcements!");
    } else {
      console.log("Announcements: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/create", (req, res, next) => {
  console.log("Inside create announcement!");
  console.log("Request Body:", req.body);
  req.body.reqtype = "create-announcement";
  kafka.make_request("announcement", req.body, function(err, result) {
    if (err) {
      console.log("Unable to create announcement", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating announcement!");
    } else {
      console.log("Announcement created ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;

//router.get("/details", (req, res, next) => {
//   let getannouncement =
//     "select * from announcement where annid=" + sqlconn.escape(req.body.annid);

//   console.log(getannouncement);
//   sqlconn.query(getannouncement, (err, result) => {
//     if (err) {
//       console.log("Error in query" + err);
//     } else {
//       res.send(JSON.stringify(result));
//     }
//   });
// });
