const express = require("express");
const router = express.Router();
const sqlconn = require("../db/sqldb");
const newCode = require("../utils/newCode");

router.get("/", (req, res, next) => {
  let getcoursedetails =
    "select * from course where courseid=" + sqlconn.escape(req.query.courseid);

  console.log(getcoursedetails);
  sqlconn.query(getcoursedetails, (err, result) => {
    if (err) {
      console.log("Error in inserting" + err);
    } else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});

router.get("/allcourses", (req, res, next) => {
  let getcourses =
    "select * from course co where co.courseid not in (select c.courseid from course_allocation ca join course c on c.courseid = ca.courseid and ca.studentid=" +
    sqlconn.escape(req.query.userid) +
    ")";
  if (req.query.filter == "courseid") {
    getcourses += " and co.courseid=" + sqlconn.escape(req.query.filtervalue);
  } else if (req.query.filter == "name") {
    getcourses +=
      " and co.description=" + sqlconn.escape(req.query.filtervalue);
  } else if (req.query.filter == "term") {
    getcourses += " and co.term=" + sqlconn.escape(req.query.filtervalue);
  }
  console.log(getcourses);
  sqlconn.query(getcourses, (err, result) => {
    if (err) {
      console.log("Error in inserting" + err);
    } else {
      res.send(JSON.stringify(result));
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
  var getenrolledcourses;
  console.log("Request for my courses" + req.query.userid);
  if (req.query.type === "Student") {
    getenrolledcourses =
      "select c.courseid, c.name 'coursename', c.description,p.name,p.email from course_allocation ca join course c on c.courseid = ca.courseid join profile p on p.profileid=c.facultyid and ca.studentid=" +
      sqlconn.escape(req.query.userid);
    if (req.query.courseid) {
      getenrolledcourses +=
        "and c.courseid=" + sqlconn.escape(req.query.courseid);
    }
    if (req.query.name) {
      getenrolledcourses += "and c.name=" + sqlconn.escape(req.query.name);
    }
    if (req.query.term) {
      getenrolledcourses += "and c.term=" + sqlconn.escape(req.query.term);
    }
  } else if (req.query.type === "Faculty") {
    getenrolledcourses =
      "select courseid,name,description,name from course where facultyid=" +
      sqlconn.escape(req.query.userid);
  }
  console.log(getenrolledcourses);
  sqlconn.query(getenrolledcourses, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
router.get("/dashboard", (req, res, next) => {
  var getenrolledcourses;
  console.log("Request for my courses" + req.query.userid);
  if (req.query.type === "Student") {
    getenrolledcourses =
      "select c.courseid, c.name 'coursename', c.description from course_allocation ca join course c on c.courseid = ca.courseid and ca.studentid=" +
      sqlconn.escape(req.query.userid);
  } else if (req.query.type === "Faculty") {
    getenrolledcourses =
      "select courseid,name,description from course where facultyid=" +
      sqlconn.escape(req.query.userid);
  }
  console.log(getenrolledcourses);
 
  sqlconn.query(getenrolledcourses, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
router.get("/waitlist", (req, res, next) => {
  var getenrolledcourses;
  console.log("Request for my courses" + req.query.userid);
  if (req.query.type === "Student") {
    getenrolledcourses =
      "select c.courseid, c.name 'coursename', c.description, ca.addcode from course_allocation ca join course c on c.courseid = ca.courseid and ca.status='waitlist' and (ca.codevalid is null or ca.codevalid='valid') and ca.studentid=" +
      sqlconn.escape(req.query.userid);
  }
  console.log(getenrolledcourses);
  sqlconn.query(getenrolledcourses, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

router.post("/create", (req, res, next) => {
  let getuserauth =
    "select type from user where userid=" + sqlconn.escape(req.body.userid);
  sqlconn.query(getuserauth, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      console.log("Check user is authorized through mysql" + result[0].type);
      if (result[0].type === "Faculty") {
        let insertcourse =
          "INSERT INTO course(courseid,name, department, description, room, capacity, waitlist, term, facultyid, status) VALUES(" +
          sqlconn.escape(req.body.courseid) +
          "," +
          sqlconn.escape(req.body.name) +
          "," +
          sqlconn.escape(req.body.department) +
          "," +
          sqlconn.escape(req.body.description) +
          "," +
          sqlconn.escape(req.body.room) +
          "," +
          sqlconn.escape(req.body.capacity) +
          "," +
          sqlconn.escape(req.body.waitlist) +
          "," +
          sqlconn.escape(req.body.term) +
          "," +
          sqlconn.escape(req.body.userid) +
          ", 'open')";
        console.log(insertcourse);
        sqlconn.query(insertcourse, (err, res) => {
          if (err) {
            console.log("Error in query" + err);
          } else {
            console.log(res);
            res.send({ message: "success" });
          }
        });
      } else {
        res.end("Not enough privileges");
      }
    }
  });
});

router.post("/addcourse", (req, res, next) => {
  let checkStatus =
    "Select status from course where courseid=" +
    sqlconn.escape(req.body.courseid);
  sqlconn.query(checkStatus, (err, result) => {
    if (err) {
      console.log("Error in query" + err);
    } else {
      if (result[0].status == "open") {
        console.log("Course is open..enrolling!");
        let enrollCourse =
          "Insert into course_allocation(courseid,studentid,status) values(" +
          sqlconn.escape(req.body.courseid) +
          "," +
          sqlconn.escape(req.body.userid) +
          ", 'confirm')";
        sqlconn.query(enrollCourse, (err, result) => {
          if (err) {
            console.log("Error in query" + err);
          } else {
            console.log(result);
            res.send(result);
          }
        });
        console.log(result);
      }
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
