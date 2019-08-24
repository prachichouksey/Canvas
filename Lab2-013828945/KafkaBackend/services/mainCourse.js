var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method Auth course");
  if (message.reqtype === "create-course") {
    console.log("Inside Create Course");
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("Checking authorization to create course");
          if (user.type === "Faculty") {
            let newCourse = new Model.Courses({
              courseid: message.courseid,
              coursename: message.name,
              department: message.department,
              description: message.description,
              room: message.room,
              capacity: message.capacity,
              waitlist: message.waitlist,
              term: message.term,
              status: "open",
              facultyid: message.userid
            });
            newCourse.save().then(
              doc => {
                console.log("Course created.", doc);
                callback(null, doc);
              },
              err => {
                console.log("Unable to add course.", err);
                callback(err, null);
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
  } else if (message.reqtype === "enroll-course") {
    console.log("Inside Enroll Course");
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log(user);
          let addCourse = {
            courseid: message.courseid,
            status: "confirm"
          };
          user.courses = user.courses || [];
          user.courses.push(addCourse);
          user.save().then(
            doc => {
              console.log("Course added.", doc);
              callback(null, doc);
            },
            err => {
              console.log("Unable to add course.", err);
              callback(err, null);
            }
          );
        }
      }
    );
  }
}

exports.handle_request = handle_request;
