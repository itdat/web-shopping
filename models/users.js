const { Pool } = require("pg");
const brcypt = require("bcryptjs");

require("dotenv").config();

// Database config
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL
});

const findUser = async email => {
  const data = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

  if (data.rows.length == 0) return null;
  return data.rows[0];
};

const createNewUser = async (email, password) => {
  try {
    const hashPassword = brcypt.hashSync(password);

    let timeStamp = new Date();
    timeStamp = timeStamp.toISOString();

    let res = await pool.query(
      `INSERT INTO users (email, password, created_at) VALUES ('${email}', '${hashPassword}', '${timeStamp}')`
    );

    // res = await pool.query(
    //   `INSERT INTO user_info (email, first_name, last_name) VALUES ('${email}','${firstName}','${lastName}')`
    // );

    let newUser = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    newUser = newUser.rows[0];

    // let userInfo = await pool.query(
    //   `SELECT * FROM user_info WHERE email = '${email}'`
    // );
    // userInfo = userInfo.rows[0];

    // newUser = { ...newUser, ...userInfo };

    return newUser;
  } catch {
    return false;
  }
};

module.exports.findUser = findUser;
module.exports.createNewUser = createNewUser;
