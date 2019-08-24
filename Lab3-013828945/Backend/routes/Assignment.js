const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const fs = require("fs");

router.get("/all", (req, res, next) => {
  console.log("Inside get assignment!");
  console.log(req.params);
  req.body = req.query;
  console.log("Request Body:", req.body);
  req.body.reqtype = "get-assignment";
  kafka.make_request("assignment", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch assignments", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching assignments!");
    } else {
      console.log("assignments: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});
router.post("/add", (req, res, next) => {
  console.log("Inside create assignment!");
  console.log("Request Body:", req.body);
  req.body.reqtype = "create-assignment";
  kafka.make_request("assignment", req.body, function(err, result) {
    if (err) {
      console.log("Unable to create assignment", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating assignment!");
    } else {
      console.log("assignment created ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});
router.post("/upload", (req, res, next) => {
  if (Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  let dir = `${__dirname}/../public/${req.body.userid}/${req.body.courseid}/${
    req.body.assignid
  }`;
  console.log("Accessing directory" + dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  uploadFile.mv(`${dir}/${fileName}`, function(err) {
    if (err) return res.status(400).send(err);
    else {
      let path =
        req.body.path +
        req.body.userid +
        "/" +
        req.body.courseid +
        "/" +
        req.body.assignid +
        "/" +
        fileName;
      console.log("Inside submit assignment!");
      let message = {
        path: path,
        reqtype: "submit-assignment",
        userid: req.body.userid,
        courseid: req.body.courseid,
        assignid: req.body.assignid
      };
      console.log("Request Body:", message);

      kafka.make_request("assignment", message, function(err, result) {
        if (err) {
          console.log("Unable to submit assignment", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in submitting assignment!");
        } else {
          console.log("assignment submitted ", result);
          res.writeHead(200, {
            "Content-type": "application/json"
          });
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

router.get("/submission", (req, res, next) => {
  console.log("Inside get submissions!");
  console.log(req.params);
  req.body = req.query;
  console.log("Request Body:", req.body);
  req.body.reqtype = "get-submissions";
  kafka.make_request("assignment", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch submissions", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching submissions!");
    } else {
      console.log("submissions: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
