var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method get course");
  if (message.reqtype === "my-courses" || message.reqtype === "my-dashboard") {
    console.log("Inside My Courses");
    console.log("Request for my courses -" + message.userid);
    if (message.type === "Faculty") {
      Model.Courses.find(
        {
          facultyid: message.userid
        },
        (err, courses) => {
          if (err) {
            console.log("Unable to fetch courses.", err);
            callback(err, null);
          } else {
            console.log("Courses: ", courses);
            callback(null, courses);
          }
        }
      );
    } else if (message.type === "Student") {
      Model.Profile.findOne({ userId: message.userid }, (err, user) => {
        if (err) {
          console.log("Unable to fetch courses.", err);
          callback(err, null);
        } else {
          console.log("Courses: ", JSON.stringify(user.courses));
          let courseIds = user.courses.map(course => course.courseid);
          mapCourseId = JSON.stringify(courseIds);
          Model.Courses.find({ courseid: courseIds }, (err, courses) => {
            if (err) {
              console.log("Unable to fetch courses.", err);
              callback(err, null);
            } else {
              callback(null, courses);
            }
          });
        }
      });
    }
  } else if (message.reqtype === "all-courses") {
    console.log("Inside All Courses");
    console.log("Request for all courses");
    let filter = message.filter;
    if (message.filtervalue) {
      console.log(filter);
      switch (message.filter) {
        case "id":
          filter = "courseid";
          break;
        case "name":
          filter = "coursename";
          break;
        case "term":
          filter = "term";
          break;
      }
      Model.Courses.find({ [filter]: message.filtervalue }, (err, courses) => {
        if (err) {
          console.log("Unable to fetch courses.", err);
          callback(err, null);
        } else {
          console.log("Courses: ", courses);
          callback(null, courses);
        }
      });
    } else {
      console.log("Courses search with pagination");
      // let pageNo = parseInt(message.pageNo);
      // let size = parseInt(message.size);
      pageNo = 1;
      size = 3;
      let query = {};
      if (pageNo < 0 || pageNo === 0) {
        response = {
          error: true,
          message: "invalid page number, should start with 1"
        };
        callback(null, response);
      }
      query.skip = size * (pageNo - 1);
      query.limit = size;
      Model.Courses.find({}, (err, courses) => {
        if (err) {
          console.log("Unable to fetch courses.", err);
          callback(err, null);
        } else {
          console.log("Courses: ", courses);
          callback(null, courses);
        }
      });
    }
  } else if (message.reqtype === "get-course") {
    console.log("Inside get Course");
    console.log("Request for get courses -" + message.courseid);

    Model.Courses.find(
      {
        courseid: message.courseid
      },
      (err, courses) => {
        if (err) {
          console.log("Unable to fetch course.", err);
          callback(err, null);
        } else {
          console.log("Course details: ", courses);
          callback(null, courses);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
