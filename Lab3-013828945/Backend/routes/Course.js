const express = require("express");
const router = express.Router();
//const sqlconn = require("../db/sqldb");
const newCode = require("../utils/newCode");
const kafka = require("../kafka/client");

router.get("/", (req, res, next) => {
  console.log("Get- all courses");
  req.body = req.query;
  req.body.reqtype = "get-course";
  console.log("Request Body: ", req.body);
  kafka.make_request("mycourses", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getting course: " + err);
    } else {
      console.log("Fetched course: ", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/allcourses", (req, res, next) => {
  console.log("Get- all courses");
  req.body = req.query;
  req.body.reqtype = "all-courses";
  console.log("Request Body: ", req.body);
  kafka.make_request("mycourses", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getting courses: " + err);
    } else {
      console.log("Fetched course results: ", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/allstudents", (req, res, next) => {
  let getcourses =
    "select * from course_allocation where courseid=" +
    sqlconn.escape(req.query.courseid);

  console.log(getcourses);
  sqlconn.query(getcourses, (err, result) => {
    if (err) {
      console.log("Error in inserting" + err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

router.get("/mycourses", (req, res, next) => {
  console.log("Get- my courses");
  req.body = req.query;
  req.body.reqtype = "my-courses";
  console.log("Request Body: ", req.body);
  kafka.make_request("mycourses", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getting courses: " + err);
    } else {
      console.log("Fetched course results: ", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/dashboard", (req, res, next) => {
  console.log("Get- my dashboard courses");
  req.body = req.query;
  req.body.reqtype = "my-dashboard";
  console.log("Request Body: ", req.body);

  kafka.make_request("mycourses", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getting courses: " + err);
    } else {
      console.log("Fetched course results: ", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/waitlist", (req, res, next) => {});

router.post("/create", (req, res, next) => {
  console.log("Create Course - Faculty");
  req.body.reqtype = "create-course";
  console.log("Request Body: ", req.body);
  kafka.make_request("course", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating course: " + err);
    } else if (result) {
      console.log("Course created successfully.", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Course created successfully!");
    } else {
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating course");
    }
  });
});

router.post("/addcourse", (req, res, next) => {
  console.log("Add Course - Student");
  console.log(req);
  req.body = req.body.params;
  req.body.reqtype = "enroll-course";
  console.log("Request Body: ", req.body);
  kafka.make_request("course", req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in adding course");
    } else {
      console.log("Course added successfully.", result);
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Course added successfully!");
    }
  });
});

router.post("/addstudent", (req, res, next) => {
  let addcode = "";
  // if (req.body.type == "Student") {
  //   let checkStudentCount = "";
  //   sqlconn.query(checkStudentCount, (err, result) => {
  //     if (err) {
  //       console.log("Error in query" + err);
  //     } else {
  //       console.log(result);

  // addcode =
  //   "UPDATE course_allocation SET codevalid ='expired', status='confirm'" +
  //   " WHERE studentid = " +
  //   sqlconn.escape(req.body.studentid) +
  //   " AND courseid=" +
  //   sqlconn.escape(req.body.courseid);
  //   }
  // });
  // } else if (req.body.type == "Faculty") {
  console.log("Random generated code: " + newCode);
  addcode =
    "UPDATE course_allocation SET addcode =" +
    sqlconn.escape(newCode) +
    " WHERE studentid = " +
    sqlconn.escape(req.body.studentid) +
    " AND courseid=" +
    sqlconn.escape(req.body.courseid);
  console.log(addcode);
  sqlconn.query(addcode, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

module.exports = router;
