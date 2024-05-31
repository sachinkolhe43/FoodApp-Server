const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 20,
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "FoodApp",
  timezone: "utc",
});

// connection.connect();

module.exports = { connection };
