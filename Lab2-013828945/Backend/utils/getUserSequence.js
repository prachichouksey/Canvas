UserCounter = require("../model/userCounter");

module.exports = function incrementCounter(schemaName, callback) {
  UserCounter.findAndModify(
    { _id: schemaName },
    [],
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function(err, result) {
      if (err) callback(err);
      else {
        console.log("Generating next userid" + result.seq);
        callback(null, result.seq);
      }
    }
  );
};
