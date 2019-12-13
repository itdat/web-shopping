const brcypt = require("bcryptjs");

// Get pool connection
const pool = require("../configs/database");

module.exports.findUser = async email => {
  const data = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

  if (data.rows.length == 0) return null;
  return data.rows[0];
};

module.exports.createNewUser = async (email, password) => {
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
