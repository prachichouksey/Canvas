var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
//var cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_calculator",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
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

app.post("/calculate", (req, res, next) => {
  var result;
  console.log(
    "Request:" +
      req.body.inputValue1 +
      " " +
      req.body.operation +
      " " +
      req.body.inputValue2 +
      " "
  );
  switch (req.body.operation) {
    case "+":
      result = Number(req.body.inputValue1) + Number(req.body.inputValue2);
      break;
    case "-":
      result = Number(req.body.inputValue1) - Number(req.body.inputValue2);
      break;
    case "*":
      result = Number(req.body.inputValue1) * Number(req.body.inputValue2);
      break;
    case "/":
      result = Number(req.body.inputValue1) / Number(req.body.inputValue2);
      break;
    default:
      result = Number(req.body.inputValue1) + Number(req.body.inputValue2);
      break;
  }
  console.log("Result" + result);
  res.end(JSON.stringify(result));
});

app.listen(4000);
