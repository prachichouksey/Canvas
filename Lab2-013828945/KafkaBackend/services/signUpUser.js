const bcrypt = require("bcryptjs");
const mongoClient = require("./../utils/mongo");
const Model = require("../utils/DbConnection");

async function handle_request(req, callback) {
  console.log("Inside Kafka Backend Signup");
  console.log("Request for signup" + req.username);
  const db = mongoClient();
  db.collection("userCounter").findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    (err, data) => {
      if (err) {
        console.log("Error incrementing user id");
      } else {
        let newUser = new Model.Profile({
          name: req.username,
          email: req.email,
          password: req.password,
          type: req.type,
          userId: data.value.seq
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            console.log("New user:" + newUser);
            console.log("Signing up user" + newUser);
            newUser.save().then(
              doc => {
                console.log("User saved successfully.", doc);
                callback(null, doc);
              },
              err => {
                console.log("Unable to save user details.", err);
                callback(err, null);
              }
            );
          });
        });
      }
    }
  );
}

exports.handle_request = handle_request;
