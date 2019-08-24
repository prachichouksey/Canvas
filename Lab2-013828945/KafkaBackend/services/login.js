const bcrypt = require("bcryptjs");
const Model = require("../utils/DbConnection");

async function handle_request(req, callback) {
  console.log("Inside login POST");
  console.log("Request Body: ", req);
  const userId = req.userid;
  const password = req.password;
  Model.Profile.findOne(
    {
      userId: userId
    },
    (err, user) => {
      if (!user) {
        console.log("User not found");
        callback(err, null);
      } else {
        console.log("USer found: " + user);
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            console.log("Password incorrect");
            callback(null, null);
          } else {
            console.log("Sending user details");
            callback(null, user);
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;
