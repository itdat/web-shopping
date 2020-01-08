// // Get pool connection
// const pool = require("../configs/database");

// module.exports.addToCart = async (userID, productPath, quantity, price) => {
//   try {
//     let tmp = await pool.query(
//       `SELECT * FROM cart WHERE product_path = '${productPath}'`
//     );

//     if (tmp.rows.length === 0) {
//       tmp = await pool.query(
//         `INSERT INTO cart (user_id, product_path, quantity, price) VALUES ('${userID}', '${productPath}', ${quantity}, '${price}')`
//       );
//       return true;
//     } else {
//       tmp = await pool.query(
//         `UPDATE cart SET quantity = quantity + ${quantity} WHERE product_path = '${productPath}'`
//       );
//       return true;
//     }
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

// module.exports.forceUpdateCart = async obj => {
//   try {
//     Object.keys(obj).forEach(async key => {
//       let tmp = await pool.query(
//         `INSERT INTO cart (product_path, quantity, price) VALUES ('${obj[key]}', ${obj[key].quantity}, '${obj[key].price}')`
//       );
//     });
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

// module.exports.getTotal = async () => {
//   try {
//     let data = await pool.query(`SELECT * FROM cart`);

//     let total = 0;

//     data.rows.forEach(row => {
//       total +=
//         Number(row.quantity) * Number(row.price.replace(/[^0-9.-]+/g, ""));
//     });

//     return total;
//   } catch (err) {
//     return -1;
//   }
// };
