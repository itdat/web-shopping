// const cartModel = require("../models/shopping-cart");

// function formatNumber(num) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
// }

// // module.exports.getTotalCartAmount = async (req, res, next) => {
// //   if (res.locals.authenticated) {
// //     let total = await cartModel.getTotal();

// //     if (total !== -1) {
// //       res.locals.totalCartAmount = formatNumber(total);
// //     }
// //   }
// //   next();
// // };

module.exports.showShoppingCart = (req, res) => {
  res.render("shopping-cart", {
    title: "Xem giỏ hàng"
  });
};

// module.exports.addToCart = async (req, res) => {
//   if (res.locals.authenticated) {
//     let result = await cartModel.addToCart(res.locals.user.id, req.params.path);

//     if (result) {
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(400);
//     }
//   } else {
//     res.sendStatus(400);
//   }
// };

// // module.exports.forceUpdate = async (req, res) => {
// //   console.log(req.body);

// //   cartModel.forceUpdateCart(req.body);
// // };
