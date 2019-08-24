const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../model/user");
const mongoClient = require("./../utils/mongo");

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
        let newUser = {
          name: req.username,
          email: req.email,
          password: req.password,
          type: req.type,
          userId: data.value.seq
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            console.log("New user:" + newUser);

            console.log("Signing up user" + newUser);
            db.collection("users").insertOne(newUser, (err, result) => {
              if (err) {
                console.log("Error inserting user in Mongo" + err);
              } else if (result) {
                console.log(
                  "User inserted in MongoDB" + JSON.stringify(result.ops)
                );
                callback(null, newUser);
              }
            });
          });
        });
      }
    }
  );
}

exports.handle_request = handle_request;
