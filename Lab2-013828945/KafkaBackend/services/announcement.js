var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method create announcement. Message ", message);
  if (message.reqtype === "create-announcement") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("Checking authorization to create announcement");
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
                  let newAnnouncement = {
                    heading: message.heading,
                    details: message.details,
                    dateCreated: message.dateCreated
                  };
                  course.announcements = course.announcements || [];
                  course.announcements.push(newAnnouncement);
                  course.save().then(
                    doc => {
                      console.log("Announcement added.", doc);
                      callback(null, doc);
                    },
                    err => {
                      console.log("Unable to add announcement.", err);
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
  } else if (message.reqtype === "get-announcement") {
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
          let announcements = course.announcements;
          callback(null, announcements);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
