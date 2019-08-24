const express = require("express");
const router = express.Router();
const passport = require("passport");

//const requireAuth = passport.authenticate("jwt", { session: false });
const kafka = require("../kafka/client");
router.get("/profile", (req, res, next) => {
  console.log("Inside get profiles!");
  console.log("Request Body:", req.body);

  //console.log(req.session.user);
  req.body.reqtype = "get-profiles";
  req.body.userid = req.query.userid;
  kafka.make_request("profile", req.body, function(err, result) {
    if (err) {
      console.log("Unable to fetch user details.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching user details!");
    } else {
      console.log("User Profile Details: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.put("/profile", function(req, res) {
  console.log("Inside update profile");
  req.body.reqtype = "update-profile";
  console.log(req.body);
  kafka.make_request("profile", req.body, function(err, result) {
    if (err) {
      console.log("Unable to update user details.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in updating user details!");
    } else {
      console.log("User Profile Details: ", result);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
