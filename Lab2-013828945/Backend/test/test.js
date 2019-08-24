var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:4000");

describe("Mocha unit test1", function() {
  // #1 should return dashboard
  it("should be able to access dashboard", function(done) {
    // calling login
    server
      .post("/login")
      .expect("Content-type", /json/)
      .send({
        username: "12363",
        password: "admin"
      })
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        console.log("test done");
        done();
      });
  });
});

describe("Mocha unit test2", function() {
  //  should return courses
  it("should return courses", function(done) {
    server
      .post("/course")
      .expect("Content-type", /json/)
      .send({
        courseid: "202"
      })
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        console.log("test done");
        done();
      });
  });
});

describe("Mocha unit test3", function() {
  it("should return all the people in a course", function(done) {
    server
      .post("/people/all")
      .expect("Content-type", /json/)
      .send({
        courseid: "202"
      })
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        console.log("test done");
        done();
      });
  });
});

describe("Mocha unit test4", function() {
  it("should return all the assignments in a course", function(done) {
    server
      .post("/assignment/all")
      .expect("Content-type", /json/)
      .send({
        courseid: "202"
      })
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        console.log("test done");
        done();
      });
  });
});

describe("Mocha unit test5", function() {
  it("should return all the announcements in a course", function(done) {
    server
      .post("/announcement/all")
      .expect("Content-type", /json/)
      .send({
        courseid: "202"
      })
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        console.log("test done");
        done();
      });
  });
});
