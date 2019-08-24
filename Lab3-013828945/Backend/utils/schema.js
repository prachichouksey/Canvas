const graphql = require("graphql");
var Model = require("./DbConnection");
var bcrypt = require("bcrypt-nodejs");
const mongoClient = require("./mongo");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLDate
} = graphql;

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
    userId: { type: GraphQLInt },
    aboutMe: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    gender: { type: GraphQLString },
    hometown: { type: GraphQLString },
    school: { type: GraphQLString },
    company: { type: GraphQLString },
    language: { type: GraphQLString },
    phone: { type: GraphQLString },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {}
    }
  })
});

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    courseid: { type: GraphQLInt },
    coursename: { type: GraphQLString },
    department: { type: GraphQLString },
    description: { type: GraphQLString },
    room: { type: GraphQLInt },
    capacity: { type: GraphQLInt },
    waitlist: { type: GraphQLString },
    term: { type: GraphQLString },
    status: { type: GraphQLString },
    facultyid: { type: GraphQLInt }
  })
});

const loginResult = new GraphQLObjectType({
  name: "loginResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    userData: { type: ProfileType }
  })
});

const profileResult = new GraphQLObjectType({
  name: "profileResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    userData: { type: ProfileType }
  })
});

const coursesResult = new GraphQLObjectType({
  name: "coursesResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    courseData: { type: new GraphQLList(CourseType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    login: {
      type: loginResult,
      args: {
        userid: { type: GraphQLString },
        password: { type: GraphQLString }
      },

      async resolve(parent, args) {
        console.log("args: ", args);
        console.log("Inside login resolve");
        const userId = args.userid;
        const password = args.password;
        let result = {
          success: false,
          userData: null
        };
        await Model.Profile.findOne(
          {
            userId: userId
          },
          (err, user) => {
            if (!user) {
              console.log("User not found");
            } else {
              console.log("User found: " + user);

              if (!bcrypt.compareSync(password, user.password)) {
                console.log("Password incorrect");
              } else {
                console.log("Sending user details");
                result = {
                  success: true,
                  userData: user
                };
              }
            }
          }
        );
        return result;
      },

      profile: {
        type: profileResult,
        args: {
          userid: { type: GraphQLInt }
        },
        async resolve(parent, args) {
          let result = { success: false, userData: null };
          await Model.Profile.findOne(
            {
              userId: args.userid
            },
            (err, user) => {
              if (err) {
                console.log("Unable to fetch user details.", err);
              } else {
                console.log("Profile Data: ", user);
                result.userData = user;
              }
            }
          );
          return result;
        }
      },

      course: {
        type: CourseType,
        args: {
          courseid: { type: GraphQLInt }
        },
        async resolve(parent, args) {
          let result = { success: false, courseData: null };
          await Model.Courses.findOne(
            {
              courseid: args.courseid
            },
            (err, course) => {
              if (err) {
                console.log("Unable to fetch course.", err);
              } else {
                console.log("Course details: ", course);
                result = {
                  success: true,
                  courseData: course
                };
              }
            }
          );
        }
      }
    },

    allcourses: {
      type: coursesResult,
      args: {},
      async resolve(parent, args) {
        let result = { success: false, courseData: null };
        await Model.Courses.find({}, (err, courses) => {
          if (err) {
            console.log("Unable to fetch courses.", err);
          } else {
            console.log("Courses: ", courses);
            result = {
              success: true,
              courseData: courses
            };
          }
        });
        return result;
      }
    },

    myCourses: {
      type: coursesResult,
      args: {
        userid: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let result = { success: false, courseData: null };
        if (args.type === "Faculty") {
          await Model.Courses.find(
            {
              facultyid: args.userid
            },
            (err, courses) => {
              if (err) {
                console.log("Unable to fetch courses.", err);
              } else {
                console.log("Courses: ", courses);
                result = {
                  success: true,
                  courseData: courses
                };
              }
            }
          );
        } else if (args.type === "Student") {
          await Model.Profile.findOne(
            { userId: +args.userid },
            async (err, user) => {
              if (err) {
                console.log("Unable to fetch courses.", err);
              } else {
                console.log("Courses: ", JSON.stringify(user.courses));
                let courseIds = user.courses.map(course => course.courseid);
                mapCourseId = JSON.stringify(courseIds);
                await Model.Courses.find(
                  { courseid: courseIds },
                  (err, courses) => {
                    if (err) {
                      console.log("Unable to fetch courses.", err);
                    } else {
                      console.log(courses);
                      result = {
                        success: true,
                        courseData: courses
                      };
                      console.log(result);
                    }
                  }
                );
              }
            }
          );
        }
        return result;
      }
    }
  })
});

const signupResult = new GraphQLObjectType({
  name: "signupResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    duplicateUser: { type: GraphQLBoolean },
    userData: { type: ProfileType }
  })
});

const mutationResult = new GraphQLObjectType({
  name: "mutationResult",
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
});

const courseResult = new GraphQLObjectType({
  name: "createCourseResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUpUser: {
      type: signupResult,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log(parent);
          const db = mongoClient();
          let result = {
            success: false,
            duplicateUser: false,
            userData: null
          };
          await Model.Profile.findOne(
            {
              email: args.email
            },
            (err, user) => {
              if (err) {
                callback(err, null);
              } else if (user) {
                console.log("User with email already exists");
                result = {
                  success: false,
                  duplicateUser: true,
                  userData: null
                };
                // return resultData;
                resolve(result);
              } else {
                db.collection("userCounter").findOneAndUpdate(
                  { _id: "userId" },
                  { $inc: { seq: 1 } },
                  (err, data) => {
                    if (err) {
                      console.log("Error incrementing user id");
                    } else {
                      let newUser = new Model.Profile({
                        name: args.username,
                        email: args.email,
                        password: args.password,
                        type: args.type,
                        userId: data.value.seq
                      });
                      newUser.password = bcrypt.hashSync(args.password);
                      // bcrypt.genSalt(10, (err, salt) => {
                      //   bcrypt.hash(newUser.password, salt, (err, hash) => {
                      //     if (err) throw err;
                      //     newUser.password = hash;
                      //     console.log("New user:" + newUser);
                      //     console.log("Signing up user" + newUser);
                      newUser.save().then(doc => {
                        console.log("User saved successfully.", doc);
                        result = {
                          success: true,
                          duplicateUser: false,
                          userData: doc
                        };
                        resolve(result);
                      });
                    }
                  }
                );
              }
            }
          );
        });
      }
    },
    updateProfile: {
      type: mutationResult,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        type: { type: GraphQLString },
        userid: { type: GraphQLInt },
        aboutMe: { type: GraphQLString },
        country: { type: GraphQLString },
        city: { type: GraphQLString },
        gender: { type: GraphQLString },
        hometown: { type: GraphQLString },
        school: { type: GraphQLString },
        company: { type: GraphQLString },
        language: { type: GraphQLString },
        phone: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log(args);
          let result = {
            success: false
          };
          await Model.Profile.findOne(
            {
              userId: args.userid
            },
            (err, user) => {
              if (err) {
                console.log("Unable to fetch user details.", err);
                resolve(result);
              } else {
                console.log("Profile Data: ", user);
                if (args.username) user.name = args.username;
                if (args.password) user.password = args.password;
                if (args.email) user.email = args.email;
                if (args.type) user.type = args.type;
                if (args.aboutme) user.aboutMe = args.aboutme;
                if (args.country) user.country = args.country;
                if (args.city) user.city = args.city;
                if (args.gender) user.gender = args.gender;
                if (args.hometown) user.hometown = args.hometown;
                if (args.school) user.school = args.school;
                if (args.company) user.company = args.company;
                if (args.language) user.language = args.language;
                if (args.phonenumber) user.phone = args.phonenumber;
                if (user.save)
                  user.save().then(
                    doc => {
                      console.log("User details saved successfully.", doc);
                      result = {
                        success: true
                      };
                      resolve(result);
                    },
                    err => {
                      console.log("Unable to save user details.", err);
                      resolve(result);
                    }
                  );
              }
            }
          );
        });
      }
    },
    createCourse: {
      type: courseResult,
      args: {
        courseid: { type: GraphQLInt },
        coursename: { type: GraphQLString },
        department: { type: GraphQLString },
        description: { type: GraphQLString },
        room: { type: GraphQLInt },
        capacity: { type: GraphQLInt },
        waitlist: { type: GraphQLString },
        term: { type: GraphQLString },
        status: { type: GraphQLString },
        userid: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log(args);
          let result = {
            success: false,
            message: null
          };
          await Model.Courses.findOne(
            {
              courseid: args.courseid
            },
            (err, course) => {
              if (err) {
              } else if (course) {
                console.log("Course already exists");
                result.message = "Course already exists";
                resolve(result);
              } else {
                Model.Profile.findOne(
                  {
                    userId: args.userid
                  },
                  (err, user) => {
                    if (err) {
                      console.log("Unable to fetch user details.", err);
                      result.message = "Unable to fetch user details";
                      resolve(result);
                    } else if (user) {
                      console.log("Checking authorization to create course");
                      if (user.type === "Faculty") {
                        let newCourse = new Model.Courses({
                          courseid: args.courseid,
                          coursename: args.name,
                          department: args.department,
                          description: args.description,
                          room: args.room,
                          capacity: args.capacity,
                          waitlist: args.waitlist,
                          term: args.term,
                          status: "open",
                          facultyid: args.userid
                        });
                        newCourse.save().then(
                          doc => {
                            console.log("Course created.", doc);
                            result = {
                              success: true,
                              message: "Course created"
                            };
                            resolve(result);
                          },
                          err => {
                            console.log("Unable to add course.", err);
                            result.message = "Unable to add course";
                            resolve(result);
                          }
                        );
                      } else {
                        console.log("Not enough privileges");

                        result.message = "Not enough privileges";
                        resolve(result);
                      }
                    }
                  }
                );
              }
            }
          );
        });
      }
    },
    enrollCourse: {
      type: courseResult,
      args: {
        userid: { type: GraphQLInt },
        courseid: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          let result = {
            success: false,
            message: null
          };
          await Model.Profile.findOne(
            {
              userId: args.userid
            },
            (err, user) => {
              if (err) {
                console.log("Unable to fetch user details.", err);
                result.message = "Unable to fetch user details";
                resolve(result);
                //callback(err, null);
              } else {
                console.log(user);
                let course = user.courses.find(
                  course => course.courseid == args.courseid
                );

                if (!course) {
                  let addCourse = {
                    courseid: args.courseid,
                    status: "confirm"
                  };
                  user.courses = user.courses || [];
                  user.courses.push(addCourse);
                  user.save().then(
                    doc => {
                      console.log("Course added.", doc);
                      result = {
                        success: true,
                        message: "Course added"
                      };
                      //callback(null, doc);
                      resolve(result);
                    },
                    err => {
                      console.log("Unable to add course.", err);
                      result.message = "Unable to add course";
                      //callback(err, null);
                      resolve(result);
                    }
                  );
                } else {
                  console.log(course);
                  //callback(err, null);
                  result.message = "Course already enrolled";
                  resolve(result);
                }
              }
            }
          );
          return result;
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
