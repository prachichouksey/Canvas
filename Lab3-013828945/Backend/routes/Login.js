const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
var kafka = require("../kafka/client");
var jwt = require("jsonwebtoken");
const secret = "canvas-secret";

router.post("/signup", (req, res) => {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);
  console.log("Inside Kafka Backend Signup");
  console.log("Request for signup" + req.username);
  const db = mongoClient();
  Model.Profile.findOne(
    {
      email: req.email
    },
    (err, user) => {
      if (err) {
        callback(err, null);
      } else if (user) {
        console.log("User with email already exists");
        res.writeHead(210, {
          "Content-type": "text/plain"
        });
        res.end("Duplicate user!");
      } else {
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
                      res.writeHead(200, {
                        "Content-type": "text/plain"
                      });
                      res.end(JSON.stringify(doc));
                    },
                    err => {
                      console.log("Unable to save user details.", err);
                      res.writeHead(400, {
                        "Content-type": "text/plain"
                      });
                      res.end("Error in fetching user details!");
                    }
                  );
                });
              });
            }
          }
        );
      }
    }
  );
  // kafka.make_request("signup", req.body, function(err, result) {
  //   console.log("In results Signup");
  //   console.log("Results: ", result);
  //   if (result) {
  //     console.log("User saved successfully.");
  //     res.writeHead(200, {
  //       "Content-type": "text/plain"
  //     });
  //     res.end(JSON.stringify(result));
  //   } else if (result == null) {
  //     console.log("User already exists.");
  //     res.writeHead(210, {
  //       "Content-type": "text/plain"
  //     });
  //     res.end("Duplicate user!");
  //   }

  //   if (err) {
  //     console.log("Unable to fetch user details. Error in Signup.", err);
  //     res.writeHead(400, {
  //       "Content-type": "text/plain"
  //     });
  //     res.end("Error in fetching user details!");
  //   }
  // });
});

router.post("/signin", (req, res, next) => {
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
            res.writeHead(401, {
              "Content-type": "text/plain"
            });
            console.log("Invalid Credentials!");
            res.end("Invalid Credentials!");
          } else {
            console.log("Sending user details");
            let token = jwt.sign(result, secret, {
              expiresIn: 36000
            });
            let loginToken = {
              userId: result.userId,
              type: result.type,
              token: token
            };
            res.cookie("userid", result.userId, {
              MaxAge: 30000,
              path: "/",
              httpOnly: false
            });
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end(JSON.stringify(loginToken));
          }
        });
      }
    }
  );
});

module.exports = router;
