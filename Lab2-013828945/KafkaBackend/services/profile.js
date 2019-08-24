var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method get profile details. Message ", message);
  if (message.reqtype === "get-profiles") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("Profile Data: ", user);
          callback(null, user);
        }
      }
    );
  } else if (message.reqtype === "update-profile") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("Profile Data: ", user);
          if (message.username) user.name = message.username;
          if (message.password) user.password = message.password;
          if (message.email) user.email = message.email;
          if (message.type) user.type = message.type;
          if (message.aboutme) user.aboutMe = message.aboutme;
          if (message.country) user.country = message.country;
          if (message.city) user.city = message.city;
          if (message.gender) user.gender = message.gender;
          if (message.hometown) user.hometown = message.hometown;
          if (message.school) user.school = message.school;
          if (message.company) user.company = message.company;
          if (message.language) user.language = message.language;
          if (message.profileImage) user.profileimage = message.profileImage;
          if (message.phonenumber) user.phone = message.phonenumber;
          if (user.save)
            user.save().then(
              doc => {
                console.log("User details saved successfully.", doc);
                callback(null, doc);
              },
              err => {
                console.log("Unable to save user details.", err);
                callback(err, null);
              }
            );
        }
      }
    );
  } else if (message.reqtype === "get-people") {
    console.log("Fetching people in course");
    Model.Profile.find(
      {
        "courses.courseid": message.courseid
      },
      (err, users) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("User details: ", users);
          callback(null, users);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
