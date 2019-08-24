const MongoClient = require("mongodb").MongoClient;

const MongoURL =
  "mongodb+srv://canvas:canvas123@cluster0-g2dhz.mongodb.net/canvasdb";
// const MongoURL = "mongodb://localhost:27017/canvasdb";
const dbName = "canvasdb";
let db = null;
(async () => {
  const client = await MongoClient.connect(MongoURL);
  db = await client.db(dbName);
  console.log("db connected");
})();

module.exports = () => db;

// try {
//   const client = new MongoClient(MongoURL);
//   client.connect();
//   console.log("Mongo db connected");
//   const db = client.db(dbName);
//   console.log(db);
//   module.exports = db;
// } catch (err) {
//   console.log(err.stack);
// }

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// async MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");

//   db.close();
// });

// const mongoClient = MongoClient.connect(
//   MongoURL,
//   {
//     useNewUrlParser: true
//   },
//   (err, client) => {
//     if (err) {
//       console.log("Error connecting to Mongo DB");
//     } else {
//       console.log("Mongo db connected");
//       return client;
//     }
//   }
// );

// module.exports = mongoClient;
