const brcypt = require("bcryptjs");

// Get pool connection
const pool = require("../configs/database");

module.exports.findUser = async email => {
  const data = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

  let result = {};
  if (data.rows.length == 0) {
    result.status = false;
    result.message = "Không tìm thấy email";
  } else {
    if (data.rows[0].status != null) {
      result.status = false;
      result.message = "Tài khoản đã bị khóa";
    } else {
      result.status = true;
      result.data = data.rows[0];
    }
  }
  return result;
  // if (data.rows.length == 0) return null;
  // return data.rows[0];
};

module.exports.createNewUser = async (email, password, phone, fullname) => {
  try {
    const hashPassword = brcypt.hashSync(password);

    let timeStamp = new Date();
    timeStamp = timeStamp.toISOString();

    let tmp = await pool.query(`SELECT COUNT(*) FROM users`);
    let maxUserID = Number(tmp.rows[0].count) + 1;

    console.log("Max user ID: ", maxUserID);
    try {
      console.log(
        `INSERT INTO users (id, email, password, created_at, phone, fullname) VALUES ('${maxUserID}','${email}', '${hashPassword}', '${timeStamp}', '${phone}', '${fullname}')`
      );
      let res = await pool.query(
        `INSERT INTO users (id, email, password, created_at, phone, fullname) VALUES ('${maxUserID}','${email}', '${hashPassword}', '${timeStamp}', '${phone}', '${fullname}')`
      );
      console.log(res.rows[0]);
      console.log("CREATED!!!");
    } catch (err) {
      return err;
    }

    let newUser = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    newUser = newUser.rows[0];

    return newUser;
  } catch {
    return false;
  }
};
