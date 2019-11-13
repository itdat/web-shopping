var express = require("express");
var router = express.Router();

const pool = require("../db-config");

/* GET home page. */
router.get("/", function(req, res, next) {
  pool.query("SELECT * FROM products", (err, res1) => {
    if (err) {
      throw err;
    }
    console.log(res1.rows);
    res.render("index", {
      title: "Trang chủ",
      layout: "layout-index",
      products: res1.rows
    });
  });
});
router.get("/index.html", function(req, res, next) {
  pool.query("SELECT * FROM test", (err, res1) => {
    if (err) {
      throw err;
    }
    res.render("index", {
      title: "Trang chủ",
      layout: "layout-index",
      data: res1.rows[2].name
    });
  });
});

/* GET about page. */
router.get("/about-us.html", function(req, res, next) {
  res.render("about-us", { title: "Thông tin" });
});

/* GET contact page. */
router.get("/contact.html", function(req, res, next) {
  res.render("contact", { title: "Liên hệ" });
});

/* GET checkout page. */
router.get("/checkout.html", function(req, res, next) {
  res.render("checkout", { title: "Phương thức thanh toán" });
});

/* GET shopping cart page. */
router.get("/shopping-cart.html", function(req, res, next) {
  res.render("shopping-cart", { title: "Xem giỏ hàng" });
});

/* GET wishlist page. */
router.get("/wishlist.html", function(req, res, next) {
  res.render("wishlist", { title: "Danh sách yêu thích" });
});

/* GET history page. */
router.get("/history.html", function(req, res, next) {
  res.render("history", { title: "Lịch sử giao dịch" });
});

/* GET FAQ page. */
router.get("/faq.html", function(req, res, next) {
  res.render("faq", { title: "Câu hỏi thường gặp" });
});

/* GET login/register page. */
router.get("/login-register.html", function(req, res, next) {
  res.render("login-register", { title: "Đăng nhập / Đăng ký" });
});

/* GET shop left sidebar page. */
router.get("/shop-left-sidebar.html", function(req, res, next) {
  res.render("shop-left-sidebar", { title: "Danh sách sản phẩm" });
});

/* GET single product page. */
router.get("/single-product.html", function(req, res, next) {
  res.render("single-product", {
    title:
      "Apple Macbook Pro Touch Bar 2019 - 15 Inchs (I7/ 16GB/ 256GB) - Hàng Nhập Khẩu Chính Hãng"
  });
});

/* GET compare page. */
router.get("/compare.html", function(req, res, next) {
  res.render("compare", { title: "So sánh sản phẩm" });
});

module.exports = router;
