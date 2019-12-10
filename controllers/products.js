const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", async (req, res, next) => {
  try {
    // Get current URL
    const currentURL = req.protocol + "://" + req.get("host") + req.url;

    const query = await products.queryBuilder(
      currentURL,
      ["brand", "price"],
      true
    );

    const allProducts = await products.query(query);

    res.status(200);
    return res.render("shop-left-sidebar", {
      title: "Danh sách sản phẩm",
      layout: "layout",
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
      allProducts: allProducts
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
