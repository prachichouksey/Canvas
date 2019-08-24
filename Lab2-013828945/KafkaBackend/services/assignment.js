var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method create assignment. Message ", message);
  if (message.reqtype === "create-assignment") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("Checking authorization to create assignment");
          if (user.type === "Faculty") {
            Model.Courses.findOne(
              {
                courseid: message.courseid
              },
              (err, course) => {
                if (err) {
                  console.log("Unable to fetch course details.", err);
                  callback(err, null);
                } else {
                  console.log("Course found " + course);
                  let newAssignment = {
                    assignid: message.assignid,
                    assignment: message.assignment,
                    marks: message.marks,
                    duedate: message.duedate
                  };
                  course.assignments = course.assignments || [];
                  course.assignments.push(newAssignment);
                  course.save().then(
                    doc => {
                      console.log("assignment added.", doc);
                      callback(null, doc);
                    },
                    err => {
                      console.log("Unable to add assignment.", err);
                      callback(err, null);
                    }
                  );
                }
              }
            );
          } else {
            console.log("Not enough privileges");
            let error = { message: "Not enough privilges" };
            callback(error, null);
          }
        }
      }
    );
  } else if (message.reqtype === "get-assignment") {
    Model.Courses.findOne(
      {
        courseid: message.courseid
      },
      (err, course) => {
        if (err) {
          console.log("Unable to fetch course details.", err);
          callback(err, null);
        } else {
          console.log("Course found " + course);
          let assignments = course.assignments;
          callback(null, assignments);
        }
      }
    );
  } else if (message.reqtype === "submit-assignment") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("User found " + user);
          let newSubmission = {
            value: message.path,
            assignid: message.assignid
          };
          console.log("User courses");
          console.log(user.courses);
          let currentCourse = user.courses.find(
            course => course.courseid === +message.courseid
          );
          console.log(currentCourse);
          let submission = currentCourse.submission || [];
          submission.push(newSubmission);
          console.log(user);
          user.save().then(
            doc => {
              console.log("assignment submission added.", doc);
              callback(null, doc);
            },
            err => {
              console.log("Unable to add submission.", err);
              callback(err, null);
            }
          );
        }
      }
    );
  } else if (message.reqtype === "get-submissions") {
    // console.log("Checking authorization to fetch submissions");
    // console.log(message);

    Model.Profile.find(
      {
        "courses.submission.assignid": message.assignid
      },
      (err, users) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("User found " + users);
          mapped_users = users.map(user => {
            let course = user.courses.find(
              course => course.courseid == message.courseid
            );
            let submission = course.submission.filter(
              sub => sub.assignid == message.assignid
            );
            return {
              userid: user.userId,
              submissions: submission
            };
          });
          callback(null, { users: mapped_users });
        }
      }
    );
  }
}

exports.handle_request = handle_request;
