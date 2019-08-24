const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://canvas:canvas123@cluster0-g2dhz.mongodb.net/canvasdb"
);

let Profile = mongoose.model("canvasusers", {
  name: { type: String },
  password: { type: String },
  email: { type: String },
  type: { type: String },
  userId: { type: Number },
  aboutMe: { type: String },
  country: { type: String },
  city: { type: String },
  gender: { type: String },
  hometown: { type: String },
  school: { type: String },
  company: { type: String },
  language: { type: String },
  profileimage: { type: String },
  phone: { type: String },
  courses: [
    {
      courseid: Number,
      status: { type: String },
      submission: [
        {
          assignid: String,
          value: String,
          grade: Number
        }
      ],
      quiz: [
        {
          quizid: Number,
          grade: Number
        }
      ]
    }
  ],
  inbox: [{ from: String, subject: String, body: String, dateSent: Date }]
});

let Courses = mongoose.model("Courses", {
  courseid: { type: Number },
  coursename: { type: String },
  department: { type: String },
  description: { type: String },
  room: { type: Number },
  capacity: { type: Number },
  waitlist: { type: String },
  term: { type: String },
  status: { type: String },
  facultyid: { type: Number },
  assignments: [
    {
      assignid: String,
      assignment: String,
      duedate: String,
      marks: Number
    }
  ],
  announcements: [
    {
      heading: String,
      details: String,
      dateCreated: String
    }
  ],
  quiz: [{ type: Number }]
});

module.exports = {
  Profile,
  Courses
};
