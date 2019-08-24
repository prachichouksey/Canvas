const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
//const mongoClient = require("./utils/mongo");
//const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// Set up middleware
var passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const AnnouncementRoute = require("./routes/Announcements");
const AssignmentRoute = require("./routes/Assignment");
const CourseRoute = require("./routes/Course");
const LoginRoute = require("./routes/Login");
const GradeRoute = require("./routes/Grades");
const PeopleRoute = require("./routes/People");
const QuizesRoute = require("./routes/quizes");
const AccountRoute = require("./routes/Account");
const InboxRoute = require("./routes/Inbox");
const fileUpload = require("express-fileupload");
//const mongodb = mongoClient.db("canvasdb");
app.use(fileUpload());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/public")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "canvas_cmpe273",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());

require("./utils/passport")(passport);
app.use(function(req, res, next) {
  // console.log(mongoClient);
  // console.log("===");
  // req.mongodb = mongoClient;
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");

  next();
});

app.use(express.static(path.join(__dirname, "/public")));

app.use("/login", LoginRoute);
app.use("/announcement", AnnouncementRoute);
app.use("/assignment", AssignmentRoute);
app.use("/course", CourseRoute);
app.use("/grades", GradeRoute);
app.use("/people", PeopleRoute);
app.use("/quizzes", QuizesRoute);
app.use("/account", AccountRoute);
app.use("/inbox", InboxRoute);
app.listen(4000);
