var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method get profile details. Message ", message);
  if (message.reqtype === "get-profiles")
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
}

exports.handle_request = handle_request;
