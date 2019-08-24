const mysqlconn = require("mysql");
const pool = mysqlconn.createConnection({
  connectionLimit: 10,
  port: "3306",
  host: "localhost",
  user: "root",
  password: "$MyNodeProject29",
  database: "canvas-cmpe273"
});

module.exports = pool;
