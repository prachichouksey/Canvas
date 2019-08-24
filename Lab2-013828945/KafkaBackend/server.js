const connection = require("./kafka/Connection");
const mongoClient = require("./utils/mongo");
const SignUp = require("./services/signUpUser");
const Login = require("./services/login");
const Profile = require("./services/profile");
const Course = require("./services/mainCourse");
const GetCourses = require("./services/myCourses");
const Announcement = require("./services/announcement");
const Assignment = require("./services/assignment");
const Inbox = require("./services/inbox");
const Grade = require("./services/grade");

function handleTopicRequest(topic_name, function_name) {
  let consumer = connection.getConsumer(topic_name);
  let producer = connection.getProducer();

  console.log("server is running");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " " + function_name);
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log("Sending data to service: " + JSON.stringify(data));
    data.data.mongodb = mongoClient();

    function_name.handle_request(data.data, function(err, res) {
      console.log("After request handling: ", res);
      let payload = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];

      producer.send(payload, function(err, data) {
        console.log("Data: ", data);
      });
      return;
    });
  });
}

handleTopicRequest("signup", SignUp);
handleTopicRequest("login", Login);
handleTopicRequest("profile", Profile);
handleTopicRequest("course", Course);
handleTopicRequest("mycourses", GetCourses);
handleTopicRequest("announcement", Announcement);
handleTopicRequest("assignment", Assignment);
handleTopicRequest("inbox", Inbox);
handleTopicRequest("grade", Grade);
