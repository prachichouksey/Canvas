const crypto = require("crypto");

const newCode = crypto.randomBytes(16).toString("hex");

module.exports = newCode;
