const MongoClient = require("mongodb").MongoClient;

const MongoURL =
  "mongodb+srv://canvas:canvas123@cluster0-g2dhz.mongodb.net/canvasdb";
//"mongodb://localhost:27017/canvasdb";
module.exports = (async function() {
  // Connection URL
  const url = MongoURL;
  // Database Name
  const dbName = "canvasdb";
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();
    console.log("Mongo db connected");
    const db = client.db(dbName);
    console.log(db);
    return db;
  } catch (err) {
    console.log(err.stack);
  }
})();

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
