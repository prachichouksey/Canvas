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

  kafka.make_request("signup", req.body, function(err, result) {
    console.log("In results Signup");
    console.log("Results: ", result);
    if (result) {
      console.log("User saved successfully.");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Adding a user successful!");
    } else if (result == null) {
      console.log("User already exists.");
      res.writeHead(210, {
        "Content-type": "text/plain"
      });
      res.end("Duplicate user!");
    }

    if (err) {
      console.log("Unable to fetch user details. Error in Signup.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching user details!");
    }
  });
});

router.post("/signin", (req, res, next) => {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);
  kafka.make_request("login", req.body, function(err, result) {
    console.log("In results login");
    console.log("results", result);
    if (err) {
      console.log("Inside err login");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in login!");
    } else {
      console.log("Sending user token");
      if (result) {
        req.session.user = result;

        let token = jwt.sign(result, secret, {
          expiresIn: 36000
        });
        // res.cookie("userid", result.userId, {
        //   MaxAge: 30000,
        //   path: "/",
        //   httpOnly: false
        // });
        // res.writeHead(200, {
        //   "Content-type": "text/plain"
        // });
        let loginToken = {
          userId: result.userId,
          type: result.type,
          token: token
        };

        res.end(JSON.stringify(loginToken));
      } else {
        res.writeHead(401, {
          "Content-type": "text/plain"
        });
        console.log("Invalid Credentials!");
        res.end("Invalid Credentials!");
      }
    }
  });
});

module.exports = router;
