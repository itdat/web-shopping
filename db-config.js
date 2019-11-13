const { Client, Pool } = require("pg");

const pool = new Pool({
  user: "kuzvoaovhzpeyo",
  host: "ec2-174-129-253-113.compute-1.amazonaws.com",
  database: "dfhkjk8bgah60g",
  password: "019eee33f628123f576439c8cd0fcfe9cff8f6d13fa57a284f08015cd1878976",
  port: 5432,
  ssl: true
});

module.exports = pool;
