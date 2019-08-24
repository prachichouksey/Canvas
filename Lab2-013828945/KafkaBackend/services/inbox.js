var Model = require("../utils/DbConnection");

function handle_request(message, callback) {
  console.log("Inside Kafka Method send message. Message ", message);
  if (message.reqtype === "send-message") {
    Model.Profile.findOne(
      {
        email: message.to
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          callback(err, null);
        } else {
          console.log("User found " + user);
          Model.Profile.findOne(
            {
              userId: message.from
            },
            (err, fromUser) => {
              if (err) {
                console.log("Unable to fetch user who sent message.", err);
                callback(err, null);
              } else {
                console.log(fromUser);
                let newMessage = {
                  subject: message.subject,
                  body: message.body,
                  from: fromUser.email,
                  dateSent: message.dateSent
                };
                user.inbox = user.inbox || [];
                user.inbox.push(newMessage);
                user.save().then(
                  doc => {
                    console.log("Message added.", doc);
                    callback(null, doc);
                  },
                  err => {
                    console.log("Unable to send message.", err);
                    callback(err, null);
                  }
                );
              }
            }
          );
        }
      }
    );
  } else if (message.reqtype === "get-messages") {
    Model.Profile.findOne(
      {
        userId: message.userid
      },
      (err, user) => {
        if (err) {
          console.log("Unable to fetch messages.", err);
          callback(err, null);
        } else {
          console.log("User found " + user);
          let messages = user.inbox;
          callback(null, messages);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
