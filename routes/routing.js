var express = require("express");
const indexController = require("../controllers/index");
const productsController = require("../controllers/products");
const productDetailsController = require("../controllers/productDetails");
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");

var router = express.Router();

/* GET home page. */
router.use("/", indexController);

/* GET list of products. */
router.use("/products", productsController);

// /* GET a specific product. */
router.get("/products/:path", productDetailsController);

/* GET register page. */
router.use("/register", registerController);

/* GET login page. */
router.use("/login", loginController);

/* GET logout. */
router.use("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
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

/* GET compare page. */
router.get("/compare.html", function(req, res, next) {
  res.render("compare", { title: "So sánh sản phẩm" });
});

module.exports = router;
