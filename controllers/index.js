const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", async (req, res, next) => {
  try {
    console.log(req.user);
    const newProducts = await products.getTop10NewProducts();
    const bestsellerProducts = await products.getTop10BestSellerProducts();
    const highRatingProducts = await products.getTop10HighRatingProducts();
    const appleBrandProducts = await products.getTop10AppleProducts();

    res.status(200);
    res.render("index", {
      title: "Trang chủ",
      layout: "layout-index",
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headerTopAuthenticated";
        } else {
          return "headerTopUnauthenticated";
        }
      },
      firstName: function() {
        if (!req.user) {
          return null;
        } else {
          if (req.user.firtsName) {
            return req.user.firtsName;
          } else {
            return req.user.email;
          }
        }
      },
      newProducts: newProducts,
      highRatingProducts: highRatingProducts,
      bestsellerProducts: bestsellerProducts,
      appleBrandProducts: appleBrandProducts
    });
  } catch (err) {
    console.log("ERROR MESSAGE:\n" + err.message);
    res.status(500);
    return res.render("error", {
      code: 500,
      title: "Lỗi truy xuất dữ liệu",
      details:
        "Có lỗi xảy ra ở server nên tạm thời yêu cầu không được phản hồi!"
    });
  }
});

module.exports = router;
