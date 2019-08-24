var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method set grade. Message ", message);
  if (message.reqtype === "set-grade") {
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

          console.log("User courses");
          console.log(user.courses);
          let course = user.courses.find(
            course => course.courseid == message.courseid
          );
          let submission = course.submission.filter(
            sub => sub.assignid == message.assignid
          );
          submission.grade = message.grade;
          console.log(submission);
          user.save().then(
            doc => {
              console.log("user grade set.", doc);
              callback(null, doc);
            },
            err => {
              console.log("Unable to set grade.", err);
              callback(err, null);
            }
          );
        }
      }
    );
  }
}

exports.handle_request = handle_request;
